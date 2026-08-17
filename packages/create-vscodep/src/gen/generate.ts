import fs from "node:fs";
import path from "node:path";
import chokidar from "chokidar";
import { colors } from "consola/utils";
import type { IExtensionManifest } from "./manifest";
import type { GenOptions } from "./types";
import {
  getDtsOutputPath,
  logger,
  readJson,
  readJsonSync,
  writeFile,
  writeJson,
} from "./utils";

const DTS_HEADER = "// 由 vscodep gen 自动生成，请勿手动修改";
const JSON_EXT = ".json";

/**
 * 两个生成器各写 d.ts 的一段，最终合并进同一个文件，
 * 因此需要保留各段的最新结果。
 */
type DtsParts = {
  nls: string;
  pkg: string;
};

function createWatcher(
  paths: string | string[],
  callback: () => Promise<void>
) {
  const watchPaths = Array.isArray(paths) ? paths : [paths];
  const watcher = chokidar.watch(watchPaths, {
    ignorePermissionErrors: true,
    persistent: true,
  });

  let ready = false;

  watcher.on("ready", async () => {
    ready = true;
    logger.info(
      `watching: ${watchPaths.map((s) => colors.green(s)).join(", ")}`
    );
    await callback();
  });

  watcher.on("all", async (event, changed) => {
    if (!ready || event === "addDir" || event === "unlinkDir") {
      return;
    }
    logger.debug(event, changed);

    try {
      await callback();
    } catch (e) {
      logger.error(e instanceof Error ? e.message : e);
    }
  });
}

export async function generateCode(options: GenOptions) {
  const opts: GenOptions = {
    ...options,
    cwd: options.cwd || process.cwd(),
    dtsName: options.dtsName ?? "vscode.d.ts",
    lang: options.lang ?? "en",
  };
  opts.locales = path.join(opts.cwd, options.locales ?? "locales");

  logger.debug("gen options", opts);

  const parts: DtsParts = { nls: "", pkg: "" };
  // 写盘串行化：watch 模式下 locales 与 package.json 两个 watcher 会并发
  // 触发，若各自独立读改写同一个 d.ts，后完成的会覆盖先完成的那一段。
  let writing: Promise<void> = Promise.resolve();
  const mergeDts = () => {
    writing = writing.then(async () => {
      const codes = [parts.nls, parts.pkg].filter(Boolean);
      await writeFile(
        getDtsOutputPath(opts),
        `${DTS_HEADER}\n${codes.join("\n")}`
      );
    });
    return writing;
  };

  if (!opts.watch) {
    // 串行执行：两者写同一个 d.ts，并行会丢结果
    await genNls(opts, parts, mergeDts);
    await genPackageDts(opts, parts, mergeDts);
    return;
  }

  createWatcher(opts.locales, () => genNls(opts, parts, mergeDts));
  createWatcher(path.join(opts.cwd, "package.json"), () =>
    genPackageDts(opts, parts, mergeDts)
  );
}

/**
 * 正向生成：locales/*.json → package.nls.json / package.nls.<locale>.json
 *
 * 源语言（--lang）的 key 作为基准，其他语言缺失的 key 用源语言回填，
 * 避免漏翻译导致 VSCode 界面出现裸露的 %key%。
 */
async function genNls(
  opts: GenOptions,
  parts: DtsParts,
  mergeDts: () => Promise<void>
) {
  const localePath = opts.locales as string;
  if (!fs.existsSync(localePath)) {
    return;
  }
  const files = fs.readdirSync(localePath).filter((s) => s.endsWith(JSON_EXT));
  if (files.length === 0) {
    return;
  }

  const defaultLocale: Record<string, string> = {
    ...readJsonSync<Record<string, string>>(
      path.join(localePath, `${opts.lang}${JSON_EXT}`)
    ),
  };

  const nlsKeys: string[] = [];

  await Promise.all(
    files.map(async (name) => {
      const locale = name.slice(0, -JSON_EXT.length);
      const messages: Record<string, string> = {
        ...(await readJson<Record<string, string>>(
          path.join(localePath, name)
        )),
      };
      for (const key of Object.keys(defaultLocale)) {
        messages[key] = messages[key] || defaultLocale[key];
      }

      nlsKeys.push(...Object.keys(messages));

      const fileName =
        locale === opts.lang
          ? "package.nls.json"
          : `package.nls.${locale.toLowerCase()}${JSON_EXT}`;
      await writeJson(path.join(opts.cwd, fileName), messages);
    })
  );

  logger.success(`生成 ${colors.green("package.nls.json")}`);

  parts.nls = buildNlsDts(nlsKeys);
  await mergeDts();
  logger.success(
    `生成 ${colors.green(opts.dtsName as string)} [package.nls.json]`
  );
}

/**
 * 把 nls 的 key 收窄成字面量联合类型，让 i18n.t() 有 key 补全与拼写校验。
 */
function buildNlsDts(keys: string[]) {
  const nlsKeys = [...new Set(keys)].sort();
  const keyUnion = nlsKeys.map((key) => `'${key}'`).join(" | ") || "never";

  return `import '@eastgold15/vscode-utils';

declare module '@eastgold15/vscode-utils' {
  type I18nMessageType = ${keyUnion};

  interface NlsI18n {
    t: ((message: I18nMessageType, ...args: Array<string | number | boolean>) => string) & ((message: I18nMessageType, args: Record<string, any>) => string);
  }
}`;
}

function toUnionType(types: string[]) {
  if (types.length === 0) {
    return;
  }
  return [...new Set(types.map((type) => `'${type}'`))].sort().join(" | ");
}

/**
 * 用 contributes.commands 收窄 registerCommand / executeCommand 的签名。
 * 这是模块增强，无需 import 任何生成物即生效——写错命令 id 直接编译报错。
 */
function getCommandDts(pkg: IExtensionManifest, opts: GenOptions) {
  const commands = pkg.contributes?.commands || [];
  const commandType = toUnionType(commands.map((s) => s.command));
  const builtinType = toUnionType(opts.builtin || []);
  if (!(commandType || builtinType)) {
    return "";
  }

  return `  export type BuiltinCommand = ${builtinType || "never"};
  export type UserCommand = ${commandType || "never"};

  export namespace commands {
    export function registerCommand(
      command: UserCommand,
      callback: (...args: any[]) => any,
      thisArg?: any,
    ): Disposable;

    export function registerTextEditorCommand(
      command: UserCommand,
      callback: (textEditor: TextEditor, edit: TextEditorEdit, ...args: any[]) => void,
      thisArg?: any,
    ): Disposable;

    export function executeCommand<T = unknown>(
      command: BuiltinCommand | UserCommand,
      ...rest: any[]
    ): Thenable<T>;
  }

  export interface Command {
    command?: BuiltinCommand | UserCommand;
  }

  export interface StatusBarItem {
    command?: BuiltinCommand | UserCommand;
  }`;
}

/**
 * 用 contributes.views 收窄 createTreeView / registerWebviewViewProvider 的 viewId。
 */
function getViewDts(pkg: IExtensionManifest) {
  const views = pkg.contributes?.views || {};
  const viewIds = Object.keys(views).flatMap((key) =>
    (views[key] || []).map((view) => view.id)
  );

  const dtsType = toUnionType(viewIds);
  if (!dtsType) {
    return "";
  }

  return `  export namespace window {
    type ViewId = ${dtsType};

    export function registerTreeDataProvider<T>(viewId: ViewId, treeDataProvider: TreeDataProvider<T>): Disposable;
    export function createTreeView<T>(viewId: ViewId, options: TreeViewOptions<T>): TreeView<T>;
    export function registerWebviewViewProvider(viewId: ViewId, provider: WebviewViewProvider, options?: {
      readonly webviewOptions?: {
        readonly retainContextWhenHidden?: boolean;
      };
    }): Disposable;
  }`;
}

async function genPackageDts(
  opts: GenOptions,
  parts: DtsParts,
  mergeDts: () => Promise<void>
) {
  const pkg = await readJson<IExtensionManifest>(
    path.join(opts.cwd, "package.json")
  );

  const blocks = [getCommandDts(pkg, opts), getViewDts(pkg)].filter(Boolean);
  parts.pkg = blocks.length
    ? `\ndeclare module 'vscode' {\n${blocks.join("\n\n")}\n}\n`
    : "";

  await mergeDts();
  logger.success(`生成 ${colors.green(opts.dtsName as string)} [package.json]`);
}
