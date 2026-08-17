import { readFileSync } from "node:fs";
import { VisulimaError } from "@visulima/error";
import {
  isPackageName,
  type PackageName,
  type VersionGetter,
  type Versions,
} from "./types";

type PkgShape = {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
};

type PkgBucket = keyof Pick<
  PkgShape,
  "dependencies" | "peerDependencies" | "devDependencies"
>;

/**
 * 桶的扫描顺序：先命中者优先。`optionalDependencies` 不计入——
 * 本工具生成的模板一定会真用上对应包。
 */
const BUCKET_ORDER: readonly PkgBucket[] = [
  "dependencies",
  "peerDependencies",
  "devDependencies",
] as const;

/**
 * 从一个 package.json 文件里提取版本号。
 *
 * 优先级：`dependencies` > `peerDependencies` > `devDependencies`。
 *
 * @param filePath 目标 package.json 绝对路径
 */
export function getPackageJsonGetter(filePath: string): VersionGetter {
  const raw = readFileSync(filePath, "utf8");
  const pkg = JSON.parse(raw) as PkgShape;
  return fromPkgObject(pkg, filePath);
}

/**
 * 内部：纯函数化版本，方便单测直接传 object。
 */
function fromPkgObject(pkg: PkgShape, source: string): VersionGetter {
  const cache: Partial<Record<PackageName, string>> = {};

  for (const field of BUCKET_ORDER) {
    const bucket = pkg[field];
    if (!bucket) {
      continue;
    }
    for (const [name, version] of Object.entries(bucket)) {
      if (isPackageName(name) && cache[name] === undefined) {
        cache[name] = version;
      }
    }
  }

  return {
    all() {
      // cache 是按 BUCKET_ORDER 顺序写入的，第一个出现的就是优先级最高的版本号
      return cache as Readonly<Versions>;
    },
    get(name) {
      const v = cache[name];
      if (v === undefined) {
        throw new VisulimaError({
          cause: { name, source },
          message: `${source} 中没有声明 ${name}`,
          name: "VersionNotFound",
        });
      }
      return v;
    },
  };
}
