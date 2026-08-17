import { createRequire } from "node:module";
import { bold, cyan, green } from "@visulima/colorize";
import { VisulimaError } from "@visulima/error";
import { createPail, type Pail } from "@visulima/pail";
import { join } from "@visulima/path";
import { camelCase, kebabCase, pascalCase } from "@visulima/string";
import { Table, TableCell } from "@visulima/tabular";
import { getDefaultVersions, type VersionGetter } from "../deps";
import { render } from "../templates";
import {
  createOrFindDir,
  createPrompt,
  detectPackageManager,
  type Framework,
  type Linter,
  type PackageManager,
  type Preferences,
  PreferencesClass,
} from "../utils";

const require = createRequire(import.meta.url);

const logger: Pail = createPail().scope("vscodep");
let cachedVersions: VersionGetter | undefined;
function getVersions(): VersionGetter {
  if (!cachedVersions) {
    cachedVersions = getDefaultVersions(require.resolve("../../package.json"));
  }
  return cachedVersions;
}

export const createCommand = {
  description: "创建一个新的 VSCode 扩展项目脚手架",
  examples: [
    "vscodep create my-extension",
    "vscodep create my-extension --pm bun --framework react --linter ultracite",
    "vscodep create my-extension --no-git --no-install",
  ],
  async execute({
    argument,
    options,
  }: {
    argument: string[];
    options: Record<string, unknown>;
  }) {
    const projectName = (argument[0] ?? "").trim() || "hello-world";
    const projectDir = join(process.cwd(), projectName);

    const p = new PreferencesClass();
    p.projectName = projectName;
    p.dir = projectDir;
    p.packageManager = readOption<PackageManager>(options, "pm", "bun");
    p.framework = readOption<Framework>(options, "framework", "react");
    p.linter = readOption<Linter>(options, "linter", "ultracite");
    p.git = readOption<boolean>(options, "git", true);
    p.vscode = readOption<boolean>(options, "vscode", true);
    p.noInstall = readOption<boolean>(options, "no-install", false);
    p.runtime = p.packageManager === "bun" ? "Bun" : "Node.js";
    p.meta = {
      commandName: kebabCase(projectName),
      viewName: pascalCase(projectName),
    };

    if (process.stdout.isTTY) {
      printBanner();
    }

    await promptMissing(p);
    await createOrFindDir(projectDir);

    printSummary(p);

    const preferences = materialize(p);
    try {
      await render(preferences, getVersions());
    } catch (e) {
      throw new VisulimaError({
        cause: e,
        message: `生成项目失败：${e instanceof Error ? e.message : String(e)}`,
        name: "RenderError",
      });
    }

    logger.success(
      `\n${green("✔")} 项目已生成到 ${bold(projectDir)}\n` +
        "  下一步：\n" +
        `    ${cyan(`cd ${projectDir}`)}\n` +
        (preferences.noInstall
          ? `    ${cyan(`${preferences.packageManager} install`)}\n`
          : "") +
        `    ${cyan(`${preferences.packageManager} run dev`)}\n`
    );
  },
  name: "create",
  options: [
    {
      alias: "p",
      defaultValue: "bun",
      description: "包管理器（bun/npm/pnpm/yarn）",
      name: "pm",
      type: String,
    },
    {
      alias: "f",
      defaultValue: "react",
      description: "前端框架（react/vue）",
      name: "framework",
      type: String,
    },
    {
      alias: "l",
      defaultValue: "ultracite",
      description: "代码检查工具（Biome/ultracite/None）",
      name: "linter",
      type: String,
    },
    {
      defaultValue: true,
      description: "初始化 git 仓库",
      name: "git",
      type: Boolean,
    },
    {
      defaultValue: true,
      description: "生成 .vscode 调试配置",
      name: "vscode",
      type: Boolean,
    },
    {
      defaultValue: false,
      description: "跳过依赖安装",
      name: "no-install",
      type: Boolean,
    },
  ],
};

function readOption<T extends string | boolean>(
  options: Record<string, unknown>,
  name: string,
  fallback: T
): T {
  const v = options[name];
  if (v === undefined || v === null) {
    return fallback;
  }
  return v as T;
}

function printBanner() {
  // boxen 是 cerebro 强 required peer；这里用 pail 自带的轻量横幅
  // eslint-disable-next-line no-console
  console.log(`

  ${green(bold("vscodep"))} ${bold("create")} ${bold("— VSCode 扩展脚手架")}

  ${cyan("•")} 用 vscodep-cli 自己的版本号生成 package.json
  ${cyan("•")} 预装 visulima/boxen 视觉
  ${cyan("•")} 集成 nls + d.ts 类型收窄（运行 ${cyan("vscodep gen")}）

`);
}

function printSummary(p: Preferences) {
  // 1. 创建 Table 实例，传入配置
  const table = new Table({
    colAligns: ["right", "left"], // 第一列右对齐，第二列左对齐
    columnWidths: [18, undefined], // 第一列 18 字符，第二列自适应
    showHeader: true, // 显示表头
    style: {
      paddingLeft: 1,
      paddingRight: 1,
    },
  });

  // 2. 设置表头
  table.setHeaders([bold("选项"), bold("值")]);

  // 3. 添加数据行
  table.addRows([
    ["项目名", p.projectName],
    ["路径", p.dir],
    ["框架", p.framework],
    ["Linter", p.linter],
    ["包管理器", p.packageManager],
    ["Runtime", p.runtime],
    ["git 仓库", p.git ? "✔" : "—"],
    [".vscode 配置", p.vscode ? "✔" : "—"],
    ["安装依赖", p.noInstall ? "—" : "✔"],
    ["command name", p.meta.commandName],
    ["view name", p.meta.viewName],
  ] as unknown as TableCell[]);

  // 4. 输出
  console.log(`\n${bold("即将生成：")}\n${table.toString()}\n`);
}

async function promptMissing(p: PreferencesClass) {
  const detected = detectPackageManager();
  const questions: import("prompts").PromptObject[] = [];

  // --pm / --framework / --linter 等已通过 CLI 传值时跳过 prompt
  if (!process.env.VSCODEP_NO_PROMPT) {
    questions.push({
      choices: [
        { title: "Bun", value: "bun" },
        { title: "npm", value: "npm" },
        { title: "pnpm", value: "pnpm" },
        { title: "yarn", value: "yarn" },
      ],
      initial: ["bun", "npm", "pnpm", "yarn"].indexOf(detected) || 0,
      message: "包管理器",
      name: "packageManager",
      type: "select",
    });
    questions.push({
      choices: [
        { title: "React", value: "react" },
        { title: "Vue", value: "vue" },
      ],
      initial: 0,
      message: "前端框架",
      name: "framework",
      type: "select",
    });
    questions.push({
      choices: [
        { title: "ultracite", value: "ultracite" },
        { title: "Biome", value: "Biome" },
        { title: "None", value: "None" },
      ],
      initial: 0,
      message: "Linter",
      name: "linter",
      type: "select",
    });
  }

  if (questions.length === 0) {
    return;
  }
  const answers = await createPrompt(questions);
  if (answers.packageManager) {
    p.packageManager = answers.packageManager;
  }
  if (answers.framework) {
    p.framework = answers.framework;
  }
  if (answers.linter) {
    p.linter = answers.linter;
  }
}

function materialize(p: PreferencesClass): Preferences {
  // camelCase 字段没用到；保留调用以满足将来模板可能引用
  void camelCase;
  return {
    dir: p.dir,
    framework: p.framework,
    git: p.git,
    linter: p.linter,
    meta: p.meta,
    noInstall: p.noInstall,
    packageManager: p.packageManager,
    projectName: p.projectName,
    runtime: p.runtime,
    vscode: p.vscode,
  };
}
