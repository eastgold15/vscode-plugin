import { outdent } from "@visulima/string";
import type { Preferences } from "../utils";

export function getExtensionIndex(preferences: Preferences) {
  const { meta } = preferences;

  return outdent`
   import type { ExtensionContext } from 'vscode';
  import { i18n, initExtension } from '@eastgold15/vscode-utils';
  import { commands, window } from 'vscode';
  import { MainPanel } from './views/panel';
  
  export function activate(context: ExtensionContext) {
  initExtension(context);
  
  context.subscriptions.push(
    commands.registerCommand('tomjs.xxx.showHello', async () => {
      window.showInformationMessage(i18n.t('tomjs.commands.hello'));
    }),
  );
  context.subscriptions.push(
    commands.registerCommand('tomjs.xxx.showPanel', async () => {
      MainPanel.render(context);
    }),
  );
  }
  
  export function deactivate() {}
  
  `;
}
