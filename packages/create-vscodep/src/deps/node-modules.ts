import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { VisulimaError } from "@visulima/error";
import type { PackageName, VersionGetter, Versions } from "./types";

type NodeModulesOptions = {
  /** CLI 自身 package.json 所在的目录 */
  ownDir: string;
  /** 这个 getter 负责的包名列表；只有这些包会被 `all()` 扫到 */
  packages: readonly PackageName[];
};

/**
 * 找到第一个装着目标包的 `node_modules` 目录。
 *
 * monorepo 工作区默认会把所有 workspace 包 hoist 到根
 * `node_modules/@scope/*`,所以从 `packages/create-vscodep`
 * 一路往上找,会在 `/<repo-root>/node_modules` 命中。
 *
 * 单测里也会用:把 `node_modules` 装在某个临时目录,设 ownDir
 * 指向临时目录的子目录即可。
 *
 * 递归而不是 `while(true)`:走到 fs 根时 `dirname(dir) === dir`,
 * 此时自然停,不会无限循环——也比循环更易读。
 */
function findPackageDir(
  startDir: string,
  pkg: PackageName
): string | undefined {
  const dir = resolve(startDir);
  const candidate = join(dir, "node_modules", pkg, "package.json");
  if (existsSync(candidate)) {
    return candidate;
  }
  const parent = dirname(dir);
  if (parent === dir) {
    return undefined;
  }
  return findPackageDir(parent, pkg);
}

/**
 * 从 CLI 自身所在目录向上查找 `node_modules/<pkg>/package.json` 并读取版本。
 *
 * 用场景：
 * - monorepo 开发态：`bun install` 把 workspace 包 hoist 到根
 *   `node_modules/@eastgold15/*`;作为 devDep 它们也会出现在那里。
 *   这种情况下从本地 fs 直接读最准,不用走 npm registry。
 * - 用户把 CLI 全局装上后,这些包没声明在 peer-deps 里,所以这个
 *   getter 自然 fall through 到下家(registry)。
 *
 * 找不到就抛错(让 chain 落到下家);不静默回退到 "latest"——隐式回退
 * 会让 release-please 流程产生难以察觉的版本漂移。
 */
export function getNodeModulesGetter(opts: NodeModulesOptions): VersionGetter {
  // 只在声明的包名集合内提供本地解析——其它包必须 fall through 到下家
  // (registry / package.json / fallback)。否则 `react` `vite` 这类生态包
  // 也会从根 node_modules 拿到「CLI 偶然装上的版本」,跳过了
  // versions.json 里维护的官方推荐版,引发无声的版本漂移。
  const allow = new Set<PackageName>(opts.packages);

  function readVersion(name: PackageName): string {
    if (!allow.has(name)) {
      throw new VisulimaError({
        cause: { name },
        message: `node_modules getter 不负责 ${name}`,
        name: "VersionNotFound",
      });
    }
    const pkgPath = findPackageDir(opts.ownDir, name);
    if (!pkgPath) {
      throw new VisulimaError({
        cause: { from: opts.ownDir, name },
        message: `在 ${opts.ownDir} 向上查找 node_modules/${name}/package.json 失败`,
        name: "VersionNotFound",
      });
    }
    const raw = readFileSync(pkgPath, "utf8");
    let pkg: { version?: unknown };
    try {
      pkg = JSON.parse(raw);
    } catch (e) {
      throw new VisulimaError({
        cause: e,
        message: `${pkgPath} 不是合法 JSON`,
        name: "VersionNotFound",
      });
    }
    if (typeof pkg.version !== "string" || pkg.version.length === 0) {
      throw new VisulimaError({
        cause: { name, pkgPath },
        message: `${pkgPath} 缺少 version 字段`,
        name: "VersionNotFound",
      });
    }
    return pkg.version;
  }

  return {
    all() {
      const out: Partial<Versions> = {};
      for (const name of opts.packages) {
        try {
          out[name] = readVersion(name);
        } catch {
          // 缺失包不参与 chain 的 all 合并,让上层 chain 继续走下家
        }
      }
      return out as Versions;
    },
    get(name) {
      return readVersion(name);
    },
  };
}
