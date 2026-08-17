import type { Logger, LogLevel, LogOptions } from "vite";
import { createLogger as _createLogger } from "vite";
import { PLUGIN_NAME } from "./constants";

/** 需要注入默认 LogOptions 的方法名，签名一致（msg, options?）才能统一包装。 */
const WRAPPED_METHODS = ["info", "warn", "warnOnce", "error"] as const;

type WrappedMethod = (typeof WRAPPED_METHODS)[number];
type LogFn = (msg: string, options?: LogOptions) => void;

export function createLogger(logLevel?: LogLevel) {
  const logger = _createLogger(logLevel, {
    allowClearScreen: true,
    prefix: `[${PLUGIN_NAME}]`,
  });

  // 默认带时间戳且不清屏：清屏会吞掉 tasks.json 的 problemMatcher 正在等待的
  // "extension build start/success" 输出，导致 F5 调试卡在编译阶段。
  for (const level of WRAPPED_METHODS) {
    const original = logger[level] as LogFn;
    (logger as Record<WrappedMethod, LogFn>)[level] = (
      msg: string,
      options?: LogOptions
    ) => {
      original(msg, { clear: false, timestamp: true, ...options });
    };
  }
  return logger as Logger;
}

export const logger = createLogger();
