/**
 * `vscodep gen` 的选项。
 *
 * 优先级：命令行参数 > 配置文件 > 默认值。
 */
export interface GenOptions {
  /**
   * 内置命令白名单。会并入 BuiltinCommand 联合类型，
   * 使 executeCommand 能调用这些 VSCode 内置命令而不报类型错。
   */
  builtin?: string[];
  /**
   * 配置文件路径。不指定时按 cosmiconfig 的搜索顺序自动发现。
   */
  config?: string;
  /**
   * 工作目录（扩展项目根目录）
   * @default process.cwd()
   */
  cwd: string;
  /**
   * d.ts 输出目录。不指定时按 types → extension → src → . 顺序探测。
   */
  dtsDir?: string;
  /**
   * d.ts 输出文件名
   * @default "vscode.d.ts"
   */
  dtsName?: string;
  /**
   * i18n 源语言。该语言生成为 package.nls.json，其余语言生成
   * package.nls.<locale>.json，缺失的 key 用源语言回填。
   * @default "en"
   */
  lang?: string;
  /**
   * i18n 源文件目录
   * @default "locales"
   */
  locales?: string;
  /**
   * 输出详细日志
   * @default false
   */
  verbose?: boolean;
  /**
   * 监听 locales 目录与 package.json 变化并增量重新生成
   * @default false
   */
  watch?: boolean;
}
