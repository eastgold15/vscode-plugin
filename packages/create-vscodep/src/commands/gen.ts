import type { Command } from "@visulima/cerebro";
import { getConfig } from "../gen/config";
import { generateCode } from "../gen/generate";
import { logger } from "../gen/utils";

type GenCommandOptions = {
  builtin?: string | string[];
  config?: string;
  dtsDir?: string;
  dtsName?: string;
  lang?: string;
  locales?: string;
  verbose?: boolean;
  watch?: boolean;
};

/**
 * `vscodep gen` —— 从 locales/*.json 与 package.json 生成 package.nls.json 与 vscode.d.ts。
 *
 * 优先级：命令行参数 > 配置文件 > 默认值。
 */
export const genCommand: Command = {
  description:
    "从 locales 与 package.json 生成 nls + d.ts（i18n 收窄 + 命令类型补全）",
  examples: [
    "vscodep gen",
    "vscodep gen --watch",
    "vscodep gen --lang zh-CN --dts-dir types",
    "vscodep gen --builtin workbench.action.files.save --builtin workbench.action.reloadWindow",
  ],
  execute: async ({ options }) => {
    const o = options as unknown as GenCommandOptions;
    const cliOpts = {
      builtin: parseList(o.builtin),
      cwd: process.cwd(),
      dtsDir: o.dtsDir,
      dtsName: o.dtsName,
      lang: o.lang,
      locales: o.locales,
      verbose: o.verbose,
      watch: o.watch,
    };

    // 配置文件覆盖 CLI 默认值；CLI 显式传的非 undefined 字段优先
    const cfg = await getConfig(cliOpts);
    const merged = { ...cfg, ...cliOpts };

    // watch 模式下 cerebro 会等 execute 完成就退出进程；chokidar 还在跑的话
    // 事件循环会被 SIGPIPE 提前干掉。在 watch 分支里保持 stdin 打开。
    await generateCode(merged);
    if (merged.watch) {
      logger.info("watching... 按 Ctrl+C 退出");
      process.stdin.resume();
    }
  },
  name: "gen",
  options: [
    {
      defaultValue: [],
      description: "VSCode 内置命令白名单（可重复传，逗号分隔）",
      name: "builtin",
      type: String,
    },
    {
      description:
        "配置文件路径（默认按 cosmiconfig 搜索 .vscodeprc.* / vscodep.config.*）",
      name: "config",
      type: String,
    },
    {
      defaultValue: "types",
      description: "d.ts 输出目录（探测顺序 types → extension → src）",
      name: "dts-dir",
      type: String,
    },
    {
      defaultValue: "vscode.d.ts",
      description: "d.ts 输出文件名",
      name: "dts-name",
      type: String,
    },
    {
      defaultValue: "en",
      description: "i18n 源语言（生成为 package.nls.json）",
      name: "lang",
      type: String,
    },
    {
      defaultValue: "locales",
      description: "i18n 源文件目录",
      name: "locales",
      type: String,
    },
    {
      alias: "v",
      defaultValue: false,
      description: "输出详细日志",
      name: "verbose",
      type: Boolean,
    },
    {
      alias: "w",
      defaultValue: false,
      description: "监听 locales 与 package.json 变化并增量重新生成",
      name: "watch",
      type: Boolean,
    },
  ],
};

/**
 * --builtin 接受重复或逗号分隔：["a,b", "c"] → ["a", "b", "c"]
 * cerebro 把 `--builtin a --builtin b` 解析为 `["a", "b"]`。
 */
function parseList(value: string | string[] | undefined): string[] {
  if (!value) {
    return [];
  }
  const list = Array.isArray(value) ? value : [value];
  return list
    .flatMap((v) => v.split(","))
    .map((v) => v.trim())
    .filter(Boolean);
}
