import { VisulimaError } from "@visulima/error";
import type { PackageName, VersionGetter, Versions } from "./types";

/**
 * 把多个 getter 串成一条链。按顺序尝试：上游命中即返回，否则 fallthrough。
 *
 * 单元测试和 `getDefaultVersions` 都会用到。链上每个 getter 只看自己有没有，
 * 不再关心下家——这是单纯组合，不引入新逻辑。
 */
export function getChainGetter(
  ...getters: readonly VersionGetter[]
): VersionGetter {
  if (getters.length === 0) {
    throw new VisulimaError({
      message: "getChainGetter 至少需要一个 getter",
      name: "EmptyChain",
    });
  }

  function get(name: PackageName): string {
    for (const g of getters) {
      try {
        return g.get(name);
      } catch {
        // fallthrough 到下一个 getter
      }
    }
    throw new VisulimaError({
      cause: name,
      message: `没有任何 getter 能解析 ${name} 的版本号`,
      name: "VersionNotFound",
    });
  }

  return {
    all() {
      // 链中后者会覆盖前者——与单点 `get` 保持一致语义
      const merged: Record<string, string> = {};
      for (const g of getters) {
        Object.assign(merged, g.all());
      }
      return merged as Versions;
    },
    get,
  };
}
