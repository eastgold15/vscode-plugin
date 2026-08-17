import { defineConfig } from "tsdown";
import pkg from "./package.json";

export default defineConfig((options) => {
  const isDev = !!options.watch;

  return [
    {
      clean: true,
      dts: false,
      entry: ["src/cli.ts"],
      env: {
        NODE_ENV: isDev ? "development" : "production",
      },
      external: Object.keys(pkg.dependencies).concat("prettier"),
      fixedExtension: false,
      format: ["cjs"],
      publint: true,
      shims: true,
      sourcemap: isDev,
      target: "node16",
    },
  ];
});
