import { getChainGetter } from "./chain";
import { getEnvGetter } from "./env";
import { getFallbackGetter } from "./fallback";
import { getPackageJsonGetter } from "./package-json";
import type { VersionGetter } from "./types";

const cache = new Map<string, VersionGetter>();

/**
 * 默认 getter 工厂。解析顺序：
 *   1. 环境变量 `VCODEP_VER_*`  （CI 锁定）
 *   2. vscodep-cli 自身的 package.json （@eastgold15/* 自动跟随）
 *   3. 内置 versions.json 兜底  （react/vite/...）
 *
 * 同路径重复调用会复用缓存，避免重复 IO / Map 构造。
 *
 * @param ownPackageJsonPath vscodep-cli 自身 package.json 绝对路径
 */
export function getDefaultVersions(ownPackageJsonPath: string): VersionGetter {
  const hit = cache.get(ownPackageJsonPath);
  if (hit) {
    return hit;
  }
  const built = getChainGetter(
    getEnvGetter(),
    getPackageJsonGetter(ownPackageJsonPath),
    getFallbackGetter()
  );
  cache.set(ownPackageJsonPath, built);
  return built;
}

/**
 * 清空缓存。仅供测试使用。
 */
export function clearDefaultVersionsCache(): void {
  cache.clear();
}
