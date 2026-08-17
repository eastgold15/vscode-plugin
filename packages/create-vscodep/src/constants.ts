// 来自 package.json，单独导出避免循环 import（cerebro 在顶层读这两个字段）
import pkg from "../package.json" with { type: "json" };

export const packageName = pkg.name;
export const packageVersion = pkg.version;
