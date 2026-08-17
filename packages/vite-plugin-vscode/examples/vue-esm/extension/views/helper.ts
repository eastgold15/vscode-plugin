import { getWebviewHtml } from "virtual:vscode";
import type { Disposable, ExtensionContext, Webview } from "vscode";
import { window } from "vscode";

export class WebviewHelper {
  public static setupHtml(webview: Webview, context: ExtensionContext) {
    return getWebviewHtml({
      context,
      injectCode: "<script>window.__FLAG1__=666;window.__FLAG2__=888;</script>",
      serverUrl: process.env.VITE_DEV_SERVER_URL,
      webview,
    });
  }

  public static setupWebviewHooks(webview: Webview, disposables: Disposable[]) {
    webview.onDidReceiveMessage(
      (message: any) => {
        const type = message.type;
        const data = message.data;
        console.log(`type: ${type}`);
        switch (type) {
          case "hello":
          case "hello2":
          case "hello3":
            window.showInformationMessage(data);
            webview.postMessage({ data: Date.now(), type });
        }
      },
      undefined,
      disposables
    );
  }
}
