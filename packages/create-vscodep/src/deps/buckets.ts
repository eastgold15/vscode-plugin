import type { PackageName, VersionGetter } from "./types";

/**
 * 模板生成物里的"分桶版本号"——一键给到 package.json 三个 bucket。
 *
 * 业务侧不再写 `if (framework === "react") ...` 来分类，直接列包名即可。
 */
export type VersionBuckets = {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  peerDependencies: Record<string, string>;
};

/**
 * 把包名按 `dependencies / devDependencies / peerDependencies` 分类声明。
 * 任意桶可省略——空对象也行。
 */
export type BucketSpec = {
  dependencies?: readonly PackageName[];
  devDependencies?: readonly PackageName[];
  peerDependencies?: readonly PackageName[];
};

/**
 * 把 getter 里的版本号按 spec 拆到三个 bucket。
 *
 * 重复的包名以 spec 中**先出现**的桶为准；`dependencies` > `peerDependencies` >
 * `devDependencies` 的优先级是 getter 自身（`getPackageJsonGetter`）的职责，
 * 这里是单纯分桶。
 */
export function bucketVersions(
  getter: VersionGetter,
  spec: BucketSpec
): VersionBuckets {
  const out: VersionBuckets = {
    dependencies: {},
    devDependencies: {},
    peerDependencies: {},
  };

  for (const name of spec.dependencies ?? []) {
    out.dependencies[name] = getter.get(name);
  }
  for (const name of spec.devDependencies ?? []) {
    out.devDependencies[name] = getter.get(name);
  }
  for (const name of spec.peerDependencies ?? []) {
    out.peerDependencies[name] = getter.get(name);
  }

  return out;
}
