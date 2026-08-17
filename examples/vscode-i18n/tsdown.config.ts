import { defineConfig } from "tsdown";

export default defineConfig((options) => ({
  clean: true,
  entry: ["src/index.ts"],
  external: ["vscode"],
  fixedExtension: false,
  format: ["cjs"],
  sourcemap: !!options.watch,
  target: "node14",
}));
