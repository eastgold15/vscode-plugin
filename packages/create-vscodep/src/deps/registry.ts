import { VisulimaError } from "@visulima/error";
import type { PackageName, VersionGetter, Versions } from "./types";

const DEFAULT_REGISTRY = "https://registry.npmjs.org/";
const DEFAULT_TIMEOUT_MS = 5000;
const USER_AGENT = "create-vscodep (+https://github.com/eastgold15)";
const TTL_MS = 60 * 60 * 1000;

type CacheEntry = {
  versions: Partial<Versions>;
  expiresAt: number;
};

type RegistryOptions = {
  /** 要查询的包名集合 */
  packages: readonly PackageName[];
  /** registry 根 URL;默认 npm public */
  registry?: string;
  /** 超时(单包),默认 5s */
  timeoutMs?: number;
  /** 自定义 fetch,便于单测注入 */
  fetch?: typeof globalThis.fetch;
};

const cache = new Map<string, CacheEntry>();

/**
 * 异步构造 registry 版本号 getter。
 *
 * 设计:
 * - 构造时一次性并发查完 `packages`,把结果存到内存 cache;
 * - 后续 `get` 是同步的——和 `VersionGetter` 接口契约保持一致;
 * - 单包超时 / 5xx 不阻塞其它包,失败的包会让 chain fallthrough;
 * - 命中 TTL(默认 1h)复用缓存,避免反复请求 npm。
 *
 * 为什么预取 + 同步 get: `VersionGetter.get` 是同步签名,模板渲染是同步的,
 * 我们不能把整个渲染管线改成 async。代价是构造期要 await 一次网络,
 * 但 CLI 启动本来就要做 IO,可接受。
 */
export async function getRegistryGetter(
  opts: RegistryOptions
): Promise<VersionGetter> {
  const registry = (opts.registry ?? DEFAULT_REGISTRY).replace(/\/+$/, "");
  const timeoutMs = opts.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const fetchImpl = opts.fetch ?? globalThis.fetch;
  const packages = opts.packages;

  const versions = await loadAllVersions(
    registry,
    packages,
    timeoutMs,
    fetchImpl
  );

  return {
    all() {
      return versions as Versions;
    },
    get(name) {
      const v = versions[name];
      if (v === undefined) {
        throw new VisulimaError({
          cause: { name, registry },
          message: `registry ${registry} 未能解析 ${name} 的版本号`,
          name: "VersionNotFound",
        });
      }
      return v;
    },
  };
}

async function loadAllVersions(
  registry: string,
  packages: readonly PackageName[],
  timeoutMs: number,
  fetchImpl: typeof globalThis.fetch
): Promise<Partial<Versions>> {
  const now = Date.now();
  const cached = cache.get(registry);
  const out: Partial<Versions> = {};
  const toFetch: PackageName[] = [];

  for (const name of packages) {
    if (
      cached &&
      cached.expiresAt > now &&
      cached.versions[name] !== undefined
    ) {
      out[name] = cached.versions[name];
    } else {
      toFetch.push(name);
    }
  }

  if (toFetch.length === 0) {
    return out;
  }

  // allSettled 而非 all:单包失败不能让整个 CLI 挂掉
  const results = await Promise.allSettled(
    toFetch.map((name) => fetchOne(registry, name, timeoutMs, fetchImpl))
  );

  const fresh: Partial<Versions> = {};
  toFetch.forEach((name, i) => {
    const r = results[i];
    if (r && r.status === "fulfilled") {
      out[name] = r.value;
      fresh[name] = r.value;
    }
  });

  // 写回缓存——即便只有部分成功也缓存成功的部分
  const previous = cache.get(registry);
  cache.set(registry, {
    expiresAt: now + TTL_MS,
    versions: { ...previous?.versions, ...fresh },
  });

  return out;
}

async function fetchOne(
  registry: string,
  name: PackageName,
  timeoutMs: number,
  fetchImpl: typeof globalThis.fetch
): Promise<string> {
  // scoped 包名直接拼在路径里:registry.npmjs.org/@scope/name/latest
  const url = `${registry}/${name}/latest`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetchImpl(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": USER_AGENT,
      },
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new VisulimaError({
        cause: { name, registry, status: res.status, url },
        message: `registry 返回 ${res.status}: ${url}`,
        name: "RegistryFetchError",
      });
    }

    const data = (await res.json()) as { version?: unknown };
    if (typeof data.version !== "string" || data.version.length === 0) {
      throw new VisulimaError({
        cause: { name, url },
        message: `registry 响应缺少 version 字段: ${url}`,
        name: "RegistryBadResponse",
      });
    }
    return data.version;
  } finally {
    clearTimeout(timer);
  }
}

/** 清空缓存,仅供测试使用。 */
export function clearRegistryCache(): void {
  cache.clear();
}
