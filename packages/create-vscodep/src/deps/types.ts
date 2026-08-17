/**
 * 模板生成时的版本号来源。
 *
 * 业务代码不关心版本号从哪里来——可能是 CLI 自身 package.json、可能是环境变量、
 * 可能是某个 JSON 文件。把来源抽到 getter，模板只认接口；
 * 单元测试可以传 mock，生产由 `DefaultVersions` 链起来。
 */
export type PackageName = keyof Versions;

export type Versions = {
  // 自身包：升 vscodep-cli 一次，模板生成时跟随
  "@eastgold15/vite-plugin-vscode": string;
  "@eastgold15/vscode-utils": string;
  "@eastgold15/vscode-webview": string;
  // 生态包
  "@biomejs/biome": string;
  "@types/react": string;
  "@types/react-dom": string;
  "@types/vscode": string;
  "@types/vscode-webview": string;
  "@vitejs/plugin-react": string;
  "@vitejs/plugin-react-swc": string;
  "@vitejs/plugin-vue": string;
  "@vscode/webview-ui-toolkit": string;
  react: string;
  "react-dom": string;
  ultracite: string;
  vite: string;
  vue: string;
};

export interface VersionGetter {
  /**
   * 一次性拿全部。getter 内部应该保证同样的结果。
   */
  all(): Readonly<Versions>;
  /**
   * 取一个包的版本字符串。键拼错会返回 `never`（编译期就过不去）。
   * getter 之间用 `ChainVersions` 串联：上游找不到就 fallthrough 到下游。
   */
  get(name: PackageName): string;
}

/**
 * 合法 npm 包名的正则。运行时校验用——TS 编译期已经限制了 `keyof Versions`，
 * 这里只防止兜底 JSON 文件 / 手写 package.json 引入脏数据。
 *
 * 规则来自 npm spec：
 * - 可选 scope `@xxx/`
 * - 第一个字符：字母/数字
 * - 后续字符：字母/数字/. / _ / -
 * - 长度 ≤ 214
 */
export const PACKAGE_NAME_REGEX =
  /^(?:@?[a-z0-9][a-z0-9._-]*\/[a-z0-9._-]+|@?[a-z0-9][a-z0-9._-]*)$/i;

export function isPackageName(name: string): name is PackageName {
  return PACKAGE_NAME_REGEX.test(name);
}
