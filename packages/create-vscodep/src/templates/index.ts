import fs from "node:fs/promises";
import path from "node:path";
import type { Preferences } from "../utils";
import { getBiomeConfig } from "./biome";
import { getESLintConfig } from "./eslint";
import { getExtensionIndex } from "./extension";
import { getExtensionHelper } from "./extension.helper";
import { getExtensionPanel } from "./extension.panel";
import { getGitignore } from "./gitignore";
import { getIndexHtml } from "./index.html";
import { getPackageJson } from "./package";
import { getReactApp, getReactMain } from "./react";
import { getReadme } from "./readme";
import {
  getTSConfigApp,
  getTSConfigNode,
  getTSConfigRoot,
} from "./tsconfig.json";
import { getUltraciteConfig } from "./ultracite";
import { getViteConfig } from "./vite.config";
import {
  getVSCodeExtensions,
  getVSCodeLaunch,
  getVSCodeSettings,
  getVSCodeTasks,
} from "./vscode";
import { getVueApp, getVueMain, getVueShims } from "./vue";

export async function render(preferences: Preferences) {
  const projectDir = preferences.dir;

  // 创建目录结构
  await fs.mkdir(path.join(projectDir, "extension", "views"), {
    recursive: true,
  });
  await fs.mkdir(path.join(projectDir, "src", "utils"), { recursive: true });

  // 写入 package.json
  await fs.writeFile(
    path.join(projectDir, "package.json"),
    getPackageJson(preferences)
  );

  // 写入 vite.config.ts
  await fs.writeFile(
    path.join(projectDir, "vite.config.ts"),
    getViteConfig(preferences)
  );

  // 写入 tsconfig.json
  await fs.writeFile(path.join(projectDir, "tsconfig.json"), getTSConfigRoot());
  await fs.writeFile(
    path.join(projectDir, "tsconfig.app.json"),
    getTSConfigApp(preferences)
  );
  await fs.writeFile(
    path.join(projectDir, "tsconfig.node.json"),
    getTSConfigNode()
  );

  // 写入 .gitignore
  await fs.writeFile(path.join(projectDir, ".gitignore"), getGitignore());

  // 写入 README.md
  await fs.writeFile(
    path.join(projectDir, "README.md"),
    getReadme(preferences)
  );

  // 写入扩展代码
  await fs.writeFile(
    path.join(projectDir, "extension", "index.ts"),
    getExtensionIndex(preferences)
  );
  await fs.writeFile(
    path.join(projectDir, "extension", "views", "panel.ts"),
    getExtensionPanel(preferences)
  );
  await fs.writeFile(
    path.join(projectDir, "extension", "views", "helper.ts"),
    getExtensionHelper(preferences)
  );

  // 写入 HTML
  await fs.writeFile(
    path.join(projectDir, "index.html"),
    getIndexHtml(preferences)
  );

  // 写入前端框架代码
  if (preferences.framework === "react") {
    await fs.writeFile(
      path.join(projectDir, "src", "main.tsx"),
      getReactMain(preferences)
    );
    await fs.writeFile(
      path.join(projectDir, "src", "App.tsx"),
      getReactApp(preferences)
    );
    await fs.writeFile(
      path.join(projectDir, "src", "vite-env.d.ts"),
      getViteEnvDts()
    );
    await fs.writeFile(
      path.join(projectDir, "src", "utils", "index.ts"),
      getUtilsIndex()
    );
    await fs.writeFile(
      path.join(projectDir, "src", "utils", "vscode.ts"),
      getUtilsVscode(preferences)
    );
    await fs.writeFile(path.join(projectDir, "src", "App.css"), getAppCss());
  } else if (preferences.framework === "vue") {
    await fs.writeFile(
      path.join(projectDir, "src", "main.ts"),
      getVueMain(preferences)
    );
    await fs.writeFile(
      path.join(projectDir, "src", "App.vue"),
      getVueApp(preferences)
    );
    await fs.writeFile(
      path.join(projectDir, "src", "vite-env.d.ts"),
      getViteEnvDts()
    );
    await fs.writeFile(
      path.join(projectDir, "src", "vscode-webview.d.ts"),
      getVscodeWebViewDts()
    );
    await fs.writeFile(
      path.join(projectDir, "src", "shims-vue.d.ts"),
      getVueShims()
    );
  }

  // 写入 Linter 配置
  if (preferences.linter === "ESLint") {
    await fs.writeFile(
      path.join(projectDir, "eslint.config.mjs"),
      getESLintConfig()
    );
  } else if (preferences.linter === "Biome") {
    await fs.writeFile(path.join(projectDir, "biome.json"), getBiomeConfig());
  } else if (preferences.linter === "ultracite") {
    await fs.writeFile(
      path.join(projectDir, "biome.json.bak"),
      getUltraciteConfig()
    );
  }

  // 写入 VSCode 配置
  if (preferences.vscode) {
    await fs.mkdir(path.join(projectDir, ".vscode"), { recursive: true });
    await fs.writeFile(
      path.join(projectDir, ".vscode", "settings.json"),
      getVSCodeSettings(preferences)
    );
    await fs.writeFile(
      path.join(projectDir, ".vscode", "extensions.json"),
      getVSCodeExtensions(preferences)
    );
    await fs.writeFile(
      path.join(projectDir, ".vscode", "launch.json"),
      getVSCodeLaunch(preferences)
    );
    await fs.writeFile(
      path.join(projectDir, ".vscode", "tasks.json"),
      getVSCodeTasks(preferences)
    );
  }
}

function getViteEnvDts() {
  return `/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
`;
}

function getVscodeWebViewDts() {
  return `
  // vscode-webview.d.ts
declare global {
  /**
   * VS Code 注入到 Webview 的全局方法，用于获取通信 API
   */
  function acquireVsCodeApi<T = unknown>(): VSCodeWebviewApi<T>;

  /**
   * VS Code Webview 通信 API 的类型定义
   */
  interface VSCodeWebviewApi<T = unknown> {
    /**
     * 向 VS Code 扩展主进程发送消息
     * @param data 可序列化的 JSON 数据（不能传函数、DOM 元素等）
     */
    postMessage(data: unknown): void;

    /**
     * 获取 Webview 的持久化状态
     */
    getState(): T | undefined;

    /**
     * 设置 Webview 的持久化状态（刷新后仍保留）
     * @param state 要保存的状态（需可序列化）
     */
    setState(state: T): T;
  }
}
// 确保这个文件被 TS 识别为模块
export {};
`;
}

function getUtilsIndex() {
  return `export * from './vscode';
`;
}

function getUtilsVscode(preferences: Preferences) {
  return `
import { WebviewApi } from '@tomjs/vscode-webview';

// Exports class singleton to prevent multiple invocations of acquireVsCodeApi.
export const vscode = new WebviewApi<string>();

`;
}

function getAppCss() {
  return `:root {
  --vscode-font-family: var(--vscode-font-family-default);
}

body {
  margin: 0;
  padding: 16px;
  font-family: var(--vscode-font-family);
  color: var(--vscode-foreground);
  background-color: var(--vscode-editor-background);
}
`;
}
