import { VisulimaError } from "@visulima/error";
import type { VersionGetter, Versions } from "./types";
import versionsJson from "./versions.json" with { type: "json" };

// versions.json 是 JSON 导入，TS 视为 `any`-like；
// 与 `Versions` 的差异先转 `unknown` 走硬转，兜底语义由 `get` 显式校验
const VERSIONS = versionsJson as unknown as Readonly<Versions>;

/**
 * 兜底：项目内置 `versions.json`。
 *
 * 包含的：
 * - 不在 vscodep-cli dependencies 里的生态包（react/vite/biome/...）
 * - 升级频率低、不值得走环境变量
 *
 * 升级方式：直接 PR 改这个 JSON 文件，单源单测。
 */
export function getFallbackGetter(): VersionGetter {
  return {
    all() {
      return VERSIONS;
    },
    get(name) {
      const v = VERSIONS[name];
      if (v === undefined) {
        throw new VisulimaError({
          cause: name,
          message: `versions.json 缺少 ${name}（这通常是构建期问题）`,
          name: "VersionNotFound",
        });
      }
      return v;
    },
  };
}
