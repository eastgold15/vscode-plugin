import { defineConfig } from "tsdown";

export default defineConfig((options) => {
  const isDev = !!options.watch;

  return {
    clean: true,
    dts: true,
    entry: ["src/index.ts"],
    env: {
      NODE_ENV: isDev ? "development" : "production",
    },
    // 固定扩展名产出 .mjs / .cjs，与 package.json 的 exports 一一对应
    fixedExtension: true,
    format: ["esm", "cjs"],
    platform: "browser",
    publint: true,
    shims: true,
    sourcemap: isDev,
    // 跑在 webview 的浏览器环境（Electron 内嵌 Chromium）
    target: ["es2020", "chrome89"],
  };
});
