import { defineConfig } from "tsdown";

export default defineConfig((options) => {
  const isDev = !!options.watch;

  return {
    clean: true,
    // vscode 由宿主运行时注入，绝不能打进产物
    deps: {
      neverBundle: ["vscode"],
    },
    dts: true,
    entry: ["src/index.ts"],
    // 固定扩展名产出 .mjs / .cjs，与 package.json 的 exports 一一对应
    fixedExtension: true,
    format: ["esm", "cjs"],
    outputOptions: {
      exports: "named",
    },
    publint: true,
    shims: true,
    sourcemap: isDev,
    // 扩展主进程跑在 VSCode 内置的 Node 上，1.75 起为 Node 16+
    target: "node16",
  };
});
