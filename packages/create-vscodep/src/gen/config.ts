import { isAccessible } from "@visulima/fs";
import { cosmiconfig } from "cosmiconfig";
import type { GenOptions } from "./types";

/**
 * 发现并加载配置。搜索位置对应 package.json 的 `vscodep` 字段、
 * `.vscodeprc.*` 与 `vscodep.config.*`。
 */
export async function getConfig(
  opts: Pick<GenOptions, "cwd" | "config">
): Promise<Partial<GenOptions>> {
  const explorer = cosmiconfig("vscodep", {
    searchPlaces: [
      "package.json",
      ".vscodeprc.js",
      ".vscodeprc.ts",
      ".vscodeprc.mjs",
      ".vscodeprc.cjs",
      "vscodep.config.js",
      "vscodep.config.ts",
      "vscodep.config.mjs",
      "vscodep.config.cjs",
    ],
    stopDir: opts.cwd,
  });

  if (opts.config) {
    if (!isAccessible(opts.config)) {
      return {};
    }

    const result = await explorer.load(opts.config);
    return result?.config || {};
  }

  const result = await explorer.search(opts.cwd);
  return result?.config || {};
}
