import { stderr, stdout } from "node:process";
import {
  ensureDir,
  isAccessible,
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
async function getDtsDir(cwd: string) {
  const folders = ["types", "extension", "src"];
  for (const folder of folders) {
    const dir = join(cwd, folder);
    // @visulima/fs 的 isAccessible 返回 Promise<boolean>——返回 truthy 即可
    if (await isAccessible(dir)) {
      return dir;
    }
  }
  return cwd;
}

export async function getDtsOutputPath(opts: GenOptions) {
  const filePath = opts.dtsDir
    ? join(opts.cwd, opts.dtsDir)
    : await getDtsDir(opts.cwd);
  await ensureDir(filePath);
  return join(filePath, opts.dtsName || "vscode.d.ts");
}

/**
 * 读 JSON，失败返回空对象。gen 的输入文件（locales、package.json）缺失或
 * 写坏都是常态（watch 模式下用户正在编辑），不应中断整个 watch 进程。
 *
 * @visulima/fs 的 readJson 不容错（找不到文件直接抛），这里保留容错 wrapper
 * 避免 watch 模式下被用户编辑行为打断。
 */
export async function readJson<T = unknown>(
  filePath: string
): Promise<T | Record<string, unknown>> {
  try {
    return ((await readJsonFile(filePath)) as T | undefined) ?? {};
  } catch {
    return {};
  }
}

export function readJsonSync<T = unknown>(
  filePath: string
): T | Record<string, unknown> {
  try {
    return (readJsonFileSync(filePath) as T | undefined) ?? {};
  } catch {
    return {};
  }
}

export async function writeFile(filePath: string, content: string) {
  // visulima/fs 的 writeFile 内部已经 ensureDir 父目录，等同于 fs-extra 的 outputFile
  // 不传 "utf8" —— WriteFileOptions 与 node:fs 的 encoding 字符串不兼容
  await visulimaWriteFile(filePath, content);
}

export async function writeJson(filePath: string, data: unknown) {
  await ensureDir(dirname(filePath));
  await visulimaWriteJson(filePath, data, { indent: 2 });
}
