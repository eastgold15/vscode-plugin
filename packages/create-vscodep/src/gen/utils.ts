import { stderr, stdout } from "node:process";
import {
  ensureDir,
  isAccessible,
  type JsonValue,
  readJson as readJsonFile,
  readJsonSync as readJsonFileSync,
  writeFile as visulimaWriteFile,
  writeJson as visulimaWriteJson,
} from "@visulima/fs";
import { createPail, type Pail } from "@visulima/pail";
import { dirname, join } from "@visulima/path";
import type { GenOptions } from "./types";

export const logger: Pail = createPail({
  scope: ["gen"],
  stderr,
  stdout,
});

/**
 * d.ts 的默认输出目录：按 types → extension → src 顺序探测，
 * 都不存在则退回项目根目录。
 */
function getDtsDir(cwd: string) {
  const folders = ["types", "extension", "src"];
  for (const folder of folders) {
    const dir = join(cwd, folder);
    if (isAccessible(dir)) {
      return dir;
    }
  }
  return cwd;
}

export function getDtsOutputPath(opts: GenOptions) {
  const filePath = opts.dtsDir
    ? join(opts.cwd, opts.dtsDir)
    : getDtsDir(opts.cwd);
  ensureDir(filePath);
  return join(filePath, opts.dtsName || "vscode.d.ts");
}

/**
 * 读 JSON，失败返回空对象。gen 的输入文件（locales、package.json）缺失或
 * 写坏都是常态（watch 模式下用户正在编辑），不应中断整个 watch 进程。
 *
 * @visulima/fs 的 readJson 不容错（找不到文件直接抛），这里保留容错 wrapper
 * 避免 watch 模式下被用户编辑行为打断。
 */
export async function readJson<T extends JsonValue = JsonValue>(
  filePath: string
): Promise<T | Record<string, unknown>> {
  try {
    return (await readJsonFile<T>(filePath)) ?? {};
  } catch {
    return {};
  }
}

export function readJsonSync<T extends JsonValue = JsonValue>(
  filePath: string
): T | Record<string, unknown> {
  try {
    return readJsonFileSync<T>(filePath) ?? {};
  } catch {
    return {};
  }
}

export async function writeFile(filePath: string, content: string) {
  // visulima/fs 的 writeFile 内部已经 ensureDir 父目录，等同于 fs-extra 的 outputFile
  await visulimaWriteFile(filePath, content, "utf8");
}

export async function writeJson(filePath: string, data: unknown) {
  ensureDir(dirname(filePath));
  await visulimaWriteJson(filePath, data, { indent: 2 });
}
