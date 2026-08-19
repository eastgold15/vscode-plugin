import { VisulimaError } from "@visulima/error";
import {
  isPackageName,
  type PackageName,
  type VersionGetter,
  type Versions,
} from "./types";

const ENV_PREFIX = "VCODEP_VER_";

/**
 * 把环境变量名后缀翻译成 npm 包名。
 *
 * 约定：`VCODEP_VER_<UPPER_SNAKE_NAME>`，例如
 *   VCODEP_VER_REACT=19.2.3
 *   VCODEP_VER_@EASTGOLD15__VSCODE_UTILS=0.2.0
 *
 * 注意 scoped 包必须用 `__` 隔 scope 和 name——POSIX 不允许环境变量
 * 含 `/`，而单纯的 `_` 又会撞上 `kebab-case` 的连字符翻译，
 * 所以用 `__` 唯一标记「这里要变回 `/`」。
 */
function envKeyToName(raw: string): string {
  // 必须先做 `__` → `/`：单 `_` 同时表示 kebab-case 的 `-`,
  // 一旦先转 `_` → `-`,`__` 就被吃成 `--` 了,无法还原 `/`。
  return raw.toLowerCase().replace(/__/g, "/").replace(/_/g, "-");
}

/**
 * 从环境变量读取版本号。
 *
 * 主要给 CI 跑回归测试时锁定版本号用，本地一般用不到。
 */
export function getEnvGetter(
  env: NodeJS.ProcessEnv = process.env
): VersionGetter {
  const cache = new Map<PackageName, string>();

  for (const [key, value] of Object.entries(env)) {
    if (!key.startsWith(ENV_PREFIX) || value === undefined) {
      continue;
    }
    const raw = key.slice(ENV_PREFIX.length);
    if (!raw) {
      continue;
    }
    // 环境变量名必须能映射回合法 PackageName。运行时校验是双保险——TS 层已经限制调用方。
    const name = envKeyToName(raw);
    if (!isPackageName(name)) {
      continue;
    }
    cache.set(name as PackageName, value);
  }

  return {
    all() {
      return Object.fromEntries(cache) as Versions;
    },
    get(name) {
      const v = cache.get(name);
      if (v === undefined) {
        throw new VisulimaError({
          cause: name,
          message: `环境变量 ${ENV_PREFIX}${nameToEnvKey(name)} 未设置`,
          name: "VersionNotFound",
        });
      }
      return v;
    },
  };
}

function nameToEnvKey(name: PackageName): string {
  return name.replace("/", "__").replace(/-/g, "_").toUpperCase();
}
