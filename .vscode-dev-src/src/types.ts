export interface CLIOptions {
  /**
   * builtin commands
   */
  builtin?: string[];
  /**
   * config file path
   * @default "vd.config.js"
   */
  config?: string;
  /**
   * current working directory
   * @default process.cwd()
   */
  cwd?: string;
  /**
   * generate d.ts file directory
   */
  dtsDir?: string;
  /**
   * generate d.ts file name, default is "vscode.d.ts"
   */
  dtsName?: string;
  /**
   * A dot-separated identifier for the configuration
   *
   * When a section-identifier is provided only that part of the configuration
   * is returned. Dots in the section-identifier are interpreted as child-access,
   * like `{ myExt: { setting: { doIt: true }}}` and `getConfiguration('myExt.setting').get('doIt') === true`.
   */
  identifier?: string;
  /**
   * source language
   * @default "en"
   */
  lang?: string;
  /**
   * i18n directory
   * @default "locales"
   */
  locales?: string;
  /**
   * verbose mode
   * @default false
   */
  verbose: boolean;
  /**
   * watch files change
   * @default false
   */
  watch?: boolean;
}
