import fs from "node:fs";
import path from "node:path";
import { consola } from "consola";
import type { GenOptions } from "./types";

export const logger = consola.withTag("gen");

/**
 * d.ts 的默认输出目录：按 types → extension → src 顺序探测，
 * 都不存在则退回项目根目录。
 */
function getDtsDir(cwd: string) {
  const folders = ["types", "extension", "src"];
  for (const folder of folders) {
    const dir = path.join(cwd, folder);
    if (fs.existsSync(dir)) {
      return dir;
    }
  }
  return cwd;
}

export function getDtsOutputPath(opts: GenOptions) {
  const filePath = opts.dtsDir
    ? path.join(opts.cwd, opts.dtsDir)
    : getDtsDir(opts.cwd);
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath, { recursive: true });
  }
  return path.join(filePath, opts.dtsName || "vscode.d.ts");
}

/**
 * 读 JSON，失败返回空对象。gen 的输入文件（locales、package.json）缺失或
 * 写坏都是常态（watch 模式下用户正在编辑），不应中断整个 watch 进程。
 */
export async function readJson<T = Record<string, unknown>>(
  filePath: string
): Promise<T> {
  try {
    const text = await fs.promises.readFile(filePath, "utf8");
    return JSON.parse(text) as T;
  } catch {
    return {} as T;
  }
}

export function readJsonSync<T = Record<string, unknown>>(filePath: string): T {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
  } catch {
    return {} as T;
  }
}

export async function writeFile(filePath: string, content: string) {
  await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
  await fs.promises.writeFile(filePath, content, "utf8");
}

export async function writeJson(filePath: string, data: unknown) {
  await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`);
}
