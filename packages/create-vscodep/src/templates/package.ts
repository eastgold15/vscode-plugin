import { outdent } from "@visulima/string";
import { bucketVersions, type PackageName, type VersionGetter } from "../deps";
import type { Preferences } from "../utils";

/**
 * 把 JSON.stringify 的多行输出缩进成 `package.json` 模板里 6 空格的样子。
 */
function inline(record: Record<string, string>): string {
  return JSON.stringify(record, null, 2).replace(/\n/g, "\n      ");
}

export function getPackageJson(
  preferences: Preferences,
  versions: VersionGetter
) {
  const { projectName, framework, linter } = preferences;

  // === 列包名 = 声明分类，不再用 if/else 维护 ===
  const coreDeps: PackageName[] = ["@vscode/webview-ui-toolkit"];

  const coreDevDeps: PackageName[] = [
    "@eastgold15/vite-plugin-vscode",
    "@types/vscode",
    "@types/vscode-webview",
    "vite",
  ];

  const corePeerDeps: PackageName[] = [
    "@eastgold15/vscode-utils",
    "@eastgold15/vscode-webview",
  ];

  const frameworkDeps: readonly PackageName[] =
    framework === "react"
      ? ["react", "react-dom"]
      : framework === "vue"
        ? ["vue"]
        : [];

  const frameworkDevDeps: readonly PackageName[] =
    framework === "react"
      ? ["@types/react", "@types/react-dom", "@vitejs/plugin-react"]
      : framework === "vue"
        ? ["@vitejs/plugin-vue"]
        : [];

  // Linter 已彻底移除 ESLint——只剩 Biome / ultracite / None
  const linterDevDeps: readonly PackageName[] =
    linter === "Biome"
      ? ["@biomejs/biome"]
      : linter === "ultracite"
        ? ["ultracite"]
        : [];

  const buckets = bucketVersions(versions, {
    dependencies: [...coreDeps, ...frameworkDeps],
    devDependencies: [...coreDevDeps, ...frameworkDevDeps, ...linterDevDeps],
    peerDependencies: corePeerDeps,
  });

  // scripts 仍手写（不属于版本号分类）
  const scripts: Record<string, string> = {
    build: "tsc && vite build",
    dev: "vite",
    preview: "vite preview",
  };
  if (linter === "Biome") {
    scripts.lint = "biome check .";
    scripts["lint:fix"] = "biome check . --write";
  }
  // ultracite 自身不带 npm scripts，调用方读官方 README 即可

  return outdent`
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
      "scripts": ${inline(scripts)},
      "dependencies": ${inline(buckets.dependencies)},
      "devDependencies": ${inline(buckets.devDependencies)},
      "peerDependencies": ${inline(buckets.peerDependencies)}
    }
  `;
}
