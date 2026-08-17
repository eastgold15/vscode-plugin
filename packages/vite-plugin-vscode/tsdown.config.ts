import { defineConfig } from "tsdown";

export default defineConfig((_options) => [
  {
    clean: false,
    deps: {
      neverBundle: ["vite"],
    },
    dts: true,
    entry: ["src/index.ts"],
    fixedExtension: false,
    format: ["esm"],
    publint: true,
    shims: true,
    target: ["node18.19"],
  },
  {
    clean: false,
    dts: {
      build: true,
    },
    entry: ["src/webview/webview.ts"],
    fixedExtension: false,
    format: ["esm"],
    loader: {
      ".html": "text",
    },
    publint: true,
    shims: true,
    target: ["node18.19"],
  },
  {
    clean: false,
    dts: false,
    entry: ["src/webview/client.ts"],
    format: ["iife"],
    platform: "browser",
    target: ["chrome89"],
  },
]);
