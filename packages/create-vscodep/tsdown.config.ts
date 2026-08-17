import { defineConfig } from "tsdown";

export default defineConfig((options) => {
  const isDev = !!options.watch;

  return {
    clean: true,
    deps: {
      // 全部运行时依赖保持 external，不打进 dist。
      // 漏列一项 tsdown 就会把它 bundle 进来，导致 dist 膨胀且出现重复 logger 实例。
      neverBundle: [
        "@visulima/cerebro",
        "@visulima/colorize",
        "@visulima/error",
        "@visulima/fs",
        "@visulima/pail",
        "@visulima/pail/reporter/pretty",
        "@visulima/path",
        "@visulima/string",
        "@visulima/tabular",
        "chokidar",
        "cosmiconfig",
        "prompts",
      ],
    },
    dts: true,
    entry: ["src/index.ts"],
    fixedExtension: true,
    // 只产 ESM：cjs 拒绝 top-level await（src/index.ts 用了 `await cli.run()`）
    format: ["esm"],
    publint: true,
    shims: true,
    sourcemap: isDev,
    // CLI 跑在用户本机 Node 上，与 vscode-utils 同样的门限
    target: ["node16"],
  };
});
