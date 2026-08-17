import dedent from "ts-dedent";
import { dependencies, devDependencies } from "../deps";
import type { Preferences } from "../utils";

export function getPackageJson(preferences: Preferences) {
  const { projectName, framework, linter, packageManager } = preferences;

  const deps: Record<string, string> = {};
  const devDeps: Record<string, string> = {};

  // 核心依赖
  deps["@vscode/webview-ui-toolkit"] =
    dependencies["@vscode/webview-ui-toolkit"];

  if (framework === "react") {
    deps.react = dependencies.react;
    deps["react-dom"] = dependencies["react-dom"];
    devDeps["@types/react"] = devDependencies["@types/react"];
    devDeps["@types/react-dom"] = devDependencies["@types/react-dom"];
  } else if (framework === "vue") {
    deps.vue = dependencies.vue;
  }

  // 核心开发依赖
  devDeps["@tomjs/tsconfig"] = devDependencies["@tomjs/tsconfig"];
  devDeps["@tomjs/vite-plugin-vscode"] =
    devDependencies["@tomjs/vite-plugin-vscode"];
  devDeps["@types/vscode"] = devDependencies["@types/vscode"];
  devDeps["@types/vscode-webview"] = devDependencies["@types/vscode-webview"];
  devDeps.vite = devDependencies.vite;

  if (framework === "react") {
    devDeps["@vitejs/plugin-react"] = devDependencies["@vitejs/plugin-react"];
  } else if (framework === "vue") {
    devDeps["@vitejs/plugin-vue"] = devDependencies["@vitejs/plugin-vue"];
  }

  // Linter
  if (linter === "ESLint") {
    devDeps.eslint = devDependencies.eslint;
  } else if (linter === "Biome") {
    devDeps["@biomejs/biome"] = devDependencies["@biomejs/biome"];
  } else if (linter === "ultracite") {
    devDeps.ultracite = devDependencies.ultracite;
  }

  const scripts: Record<string, string> = {
    build: "tsc && vite build",
    dev: "vite",
    preview: "vite preview",
  };

  if (linter === "ESLint") {
    scripts.lint = "eslint .";
    scripts["lint:fix"] = "eslint . --fix";
  } else if (linter === "Biome") {
    scripts.lint = "biome check .";
    scripts["lint:fix"] = "biome check . --write";
  }

  return dedent`
    {
      "publisher": "your-publisher-name",
      "name": "${projectName}",
      "type": "commonjs",
      "version": "0.0.1",
      "private": true,
      "description": "VS Code extension built with ${framework}",
      "main": "dist/extension/index.js",
      "engines": {
        "node": ">=18",
        "vscode": "^1.75.0"
      },
      "activationEvents": [],
      "contributes": {
        "commands": [
          {
            "command": "${preferences.meta.commandName}.show${preferences.meta.viewName}",
            "title": "${preferences.meta.viewName}: Show"
          }
        ]
      },
      "scripts": ${JSON.stringify(scripts, null, 2).replace(/\n/g, "\n      ")},
      "dependencies": ${JSON.stringify(deps, null, 2).replace(/\n/g, "\n      ")},
      "devDependencies": ${JSON.stringify(devDeps, null, 2).replace(/\n/g, "\n      ")}
    }
  `;
}
