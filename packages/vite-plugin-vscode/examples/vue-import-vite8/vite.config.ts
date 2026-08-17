import path from "node:path";
import vscode from "@tomjs/vite-plugin-vscode";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false,
    rolldownOptions: {
      input: [
        path.resolve(import.meta.dirname, "index.html"),
        path.resolve(import.meta.dirname, "index2.html"),
      ],
      output: {
        // https://rollupjs.org/configuration-options/#output-manualchunks
        manualChunks: (id) => {
          if (id.includes("pixi.js")) {
            return "pixi";
          }
        },
      },
    },
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag: string) => tag.startsWith("vscode-"),
        },
      },
    }),
    vscode({
      extension: {
        minify: false,
      },
    }),
  ],
});
