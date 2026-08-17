import { getWebviewHtml } from "virtual:vscode";
import type { Disposable, ExtensionContext, Webview } from "vscode";
import { window } from "vscode";

export class WebviewHelper {
  public static setupHtml(webview: Webview, context: ExtensionContext) {
    return getWebviewHtml({
      context,
      serverUrl: process.env.VITE_DEV_SERVER_URL,
      webview,
    });
  }

  public static setupHtml2(webview: Webview, context: ExtensionContext) {
    return getWebviewHtml({
      context,
      inputName: "index2",
      serverUrl: `${process.env.VITE_DEV_SERVER_URL}/index2.html`,
      webview,
    });
  }

  public static setupWebviewHooks(webview: Webview, disposables: Disposable[]) {
    webview.onDidReceiveMessage(
      (message: any) => {
        const command = message.command;
        const text = message.text;
        console.log(`command: ${command}`);
        switch (command) {
          case "hello":
            window.showInformationMessage(text);
        }
      },
      undefined,
      disposables
    );
  }
}
