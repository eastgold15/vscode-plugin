/**
 * copy from https://github.com/microsoft/vscode/blob/main/src/vs/platform/extensions/common/extensions.ts
 */

import type { ILocalizedString } from "../action";
import type { ExtensionKind } from "../environment";

export interface ICommand {
  category?: string | ILocalizedString;
  command: string;
  title: string | ILocalizedString;
}

export interface IConfigurationProperty {
  default?: any;
  description: string;
  type: string | string[];
}

export interface IConfiguration {
  id?: string;
  order?: number;
  properties: { [key: string]: IConfigurationProperty };
  title?: string;
}

export interface IDebugger {
  label?: string;
  runtime?: string;
  type: string;
}

export interface IGrammar {
  language: string;
}

export interface IJSONValidation {
  fileMatch: string | string[];
  url: string;
}

export interface IKeyBinding {
  command: string;
  key: string;
  linux?: string;
  mac?: string;
  when?: string;
  win?: string;
}

export interface ILanguage {
  aliases: string[];
  extensions: string[];
  id: string;
}

export interface IMenu {
  alt?: string;
  command: string;
  group?: string;
  when?: string;
}

export interface ISnippet {
  language: string;
}

export interface ITheme {
  label: string;
}

export interface IViewContainer {
  id: string;
  title: string;
}

export interface IView {
  id: string;
  name: string;
}

export interface IColor {
  defaults: { light: string; dark: string; highContrast: string };
  description: string;
  id: string;
}

interface IWebviewEditor {
  readonly priority: string;
  readonly selector: readonly {
    readonly filenamePattern?: string;
  }[];
  readonly viewType: string;
}

export interface ICodeActionContributionAction {
  readonly description?: string;
  readonly kind: string;
  readonly title: string;
}

export interface ICodeActionContribution {
  readonly actions: readonly ICodeActionContributionAction[];
  readonly languages: readonly string[];
}

export interface IAuthenticationContribution {
  readonly id: string;
  readonly label: string;
}

export interface IWalkthroughStep {
  readonly completionEvents?: string[];
  readonly description: string | undefined;
  /** @deprecated use `completionEvents: 'onCommand:...'` */
  readonly doneOn?: { command: string };
  readonly id: string;
  readonly media:
    | {
        image: string | { dark: string; light: string; hc: string };
        altText: string;
        markdown?: never;
        svg?: never;
      }
    | { markdown: string; image?: never; svg?: never }
    | { svg: string; altText: string; markdown?: never; image?: never };
  readonly title: string;
  readonly when?: string;
}

export interface IWalkthrough {
  readonly description: string;
  readonly featuredFor: string[] | undefined;
  readonly icon?: string;
  readonly id: string;
  readonly steps: IWalkthroughStep[];
  readonly title: string;
  readonly when?: string;
}

export interface IStartEntry {
  readonly category: "file" | "folder" | "notebook";
  readonly command: string;
  readonly description: string;
  readonly title: string;
  readonly when?: string;
}

export interface INotebookEntry {
  readonly displayName: string;
  readonly type: string;
}

export interface INotebookRendererContribution {
  readonly displayName: string;
  readonly id: string;
  readonly mimeTypes: string[];
}

export interface IDebugVisualizationContribution {
  readonly id: string;
  readonly when: string;
}

export interface ITranslation {
  id: string;
  path: string;
}

export interface ILocalizationContribution {
  languageId: string;
  languageName?: string;
  localizedLanguageName?: string;
  minimalTranslations?: { [key: string]: string };
  translations: ITranslation[];
}

export interface IExtensionContributions {
  authentication?: IAuthenticationContribution[];
  readonly codeActions?: readonly ICodeActionContribution[];
  colors?: IColor[];
  commands?: ICommand[];
  configuration?: IConfiguration | IConfiguration[];
  readonly customEditors?: readonly IWebviewEditor[];
  debuggers?: IDebugger[];
  readonly debugVisualizers?: IDebugVisualizationContribution[];
  grammars?: IGrammar[];
  iconThemes?: ITheme[];
  jsonValidation?: IJSONValidation[];
  keybindings?: IKeyBinding[];
  languages?: ILanguage[];
  localizations?: ILocalizationContribution[];
  menus?: { [context: string]: IMenu[] };
  readonly notebookRenderer?: INotebookRendererContribution[];
  readonly notebooks?: INotebookEntry[];
  productIconThemes?: ITheme[];
  snippets?: ISnippet[];
  startEntries?: IStartEntry[];
  themes?: ITheme[];
  views?: { [location: string]: IView[] };
  viewsContainers?: { [location: string]: IViewContainer[] };
  walkthroughs?: IWalkthrough[];
}

export interface IExtensionCapabilities {
  readonly untrustedWorkspaces?: ExtensionUntrustedWorkspaceSupport;
  readonly virtualWorkspaces?: ExtensionVirtualWorkspaceSupport;
}

export type LimitedWorkspaceSupportType = "limited";
export type ExtensionUntrustedWorkspaceSupportType =
  | boolean
  | LimitedWorkspaceSupportType;
export type ExtensionUntrustedWorkspaceSupport =
  | { supported: true }
  | { supported: false; description: string }
  | {
      supported: LimitedWorkspaceSupportType;
      description: string;
      restrictedConfigurations?: string[];
    };

export type ExtensionVirtualWorkspaceSupportType =
  | boolean
  | LimitedWorkspaceSupportType;
export type ExtensionVirtualWorkspaceSupport =
  | boolean
  | { supported: true }
  | { supported: false | LimitedWorkspaceSupportType; description: string };

export interface IRelaxedExtensionManifest {
  activationEvents?: string[];
  api?: string;
  browser?: string;
  bugs?: { url: string };
  capabilities?: IExtensionCapabilities;
  categories?: string[];
  contributes?: IExtensionContributions;
  description?: string;
  displayName?: string;
  enabledApiProposals?: readonly string[];
  engines: { readonly vscode: string };
  extensionDependencies?: string[];
  extensionKind?: ExtensionKind | ExtensionKind[];
  extensionPack?: string[];
  icon?: string;
  keywords?: string[];
  // For now this only supports pointing to l10n bundle files
  // but it will be used for package.l10n.json files in the future
  l10n?: string;
  main?: string;
  name: string;
  preview?: boolean;
  publisher: string;
  repository?: { url: string };
  scripts?: { [key: string]: string };
  version: string;
}

export type IExtensionManifest = Readonly<IRelaxedExtensionManifest>;
