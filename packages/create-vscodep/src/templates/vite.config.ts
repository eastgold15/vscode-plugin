import dedent from "ts-dedent";
import type { Preferences } from "../utils";

export function getViteConfig(preferences: Preferences) {
  const { framework } = preferences;

  let pluginImport = "";
  let pluginConfig = "";

  if (framework === "react") {
    pluginImport = `import react from '@vitejs/plugin-react';`;
    pluginConfig = "react(),";
  } else if (framework === "vue") {
    pluginImport = `import vue from '@vitejs/plugin-vue';`;
    pluginConfig = "vue(),";
  }

  return dedent`
    import { defineConfig } from 'vite';
    import vscode from '@tomjs/vite-plugin-vscode';
    import { fileURLToPath, URL } from 'node:url';
    import react from '@vitejs/plugin-react-swc';
    ${pluginImport}

    export default defineConfig({
      plugins: [
        ${pluginConfig}
        vscode(),
      ],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
      },
      build: {
        chunkSizeWarningLimit: 102400,
        reportCompressedSize: false,
      },
    });
  `;
}
