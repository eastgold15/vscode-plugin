import { getChainGetter } from "./chain";
import { getEnvGetter } from "./env";
import { getFallbackGetter } from "./fallback";
import { getNodeModulesGetter } from "./node-modules";
import { getPackageJsonGetter } from "./package-json";
import { getRegistryGetter } from "./registry";
import type { PackageName, VersionGetter } from "./types";

/**
 * 这三个包 vscodep-cli 不会真的 import(都是 outdent 模板字符串里的代码),
 * 但要在生成的 package.json 里塞版本号。
 *
 * 原本做法是从 vscodep-cli 自己的 peerDependencies 字段读——在 monorepo
 * 里就是 `workspace:*`,在 release-please 流程下会错位。所以改成在 CLI
 * 启动时按下面的优先级实时解析:
 *   1. 环境变量         — CI 锁版 / 离线降级
 *   2. 本地 node_modules — monorepo 开发态,workspace 链接都在
 *   3. npm registry     — 包发布后的真实最新版
 *   4. 自身 package.json — 兜底(几乎不会命中,因为这仨已从 peer-dep 移除)
 */
const REGISTRY_PACKAGES = [
  "@eastgold15/vite-plugin-vscode",
  "@eastgold15/vscode-utils",
  "@eastgold15/vscode-webview",
] as const satisfies readonly PackageName[];

const cache = new Map<string, VersionGetter>();

export type DefaultVersionsOptions = {
  /**
   * vscodep-cli 自身 package.json 的绝对路径。
   * 既用于 package.json getter,也用于推算 node_modules 根。
   */
  ownPackageJsonPath: string;
};

export async function getDefaultVersions(
  opts: DefaultVersionsOptions
): Promise<VersionGetter> {
  const { ownPackageJsonPath } = opts;
  const hit = cache.get(ownPackageJsonPath);
  if (hit) {
    return hit;
  }

  // node_modules 与 own package.json 同一层目录
  const cliRoot = ownPackageJsonPath.replace(/\/package\.json$/, "");

  const [registryGetter] = await Promise.all([
    getRegistryGetter({ packages: REGISTRY_PACKAGES }),
    // 预热 node_modules 缓存(同步 IO 在主线程上做,这里没意义包成 async)
    Promise.resolve(),
  ]);

  const built = getChainGetter(
    getEnvGetter(),
    getNodeModulesGetter({ ownDir: cliRoot, packages: REGISTRY_PACKAGES }),
    registryGetter,
    getPackageJsonGetter(ownPackageJsonPath),
    getFallbackGetter()
  );
  cache.set(ownPackageJsonPath, built);
  return built;
}

/** 清空缓存。仅供测试使用。 */
export function clearDefaultVersionsCache(): void {
  cache.clear();
}
