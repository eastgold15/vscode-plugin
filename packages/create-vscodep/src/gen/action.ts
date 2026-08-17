/**
 * copy from https://github.com/microsoft/vscode/blob/main/src/vs/platform/action/common/action.ts
 *
 * 本工具只用其字面量形态；`string` 分支让 `category/title` 接受纯字符串，
 * 完整 markdown 对象这里不展开。
 */
export type ILocalizedString = string | ILocalizedStringObject;

export interface ILocalizedStringObject {
  /**
   * The original (non localized value of the string)
   */
  original: string;
  /**
   * The localized value of the string.
   */
  value: string;
}
