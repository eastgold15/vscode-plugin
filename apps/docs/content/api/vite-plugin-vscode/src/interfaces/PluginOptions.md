[**vscode-plugin-monorepo**](../../../README.md)

***

[vscode-plugin-monorepo](../../../README.md) / [vite-plugin-vscode/src](../README.md) / PluginOptions

# Interface: PluginOptions

Defined in: packages/vite-plugin-vscode/src/types.ts:39

vite plugin options.

## Properties

### devtools?

> `optional` **devtools?**: `number` \| `boolean`

Defined in: packages/vite-plugin-vscode/src/types.ts:48

Whether to enable devtools. Inject `<script src="http://localhost:<devtools-port>"></script>` into webview client . Default is true.
 - true:
   - react: inject `<script src="http://localhost:8097"></script>`
   - vue: inject `<script src="http://localhost:8098"></script>`
 - `number`: custom port

#### Default

```ts
false
```

***

### extension?

> `optional` **extension?**: [`ExtensionOptions`](ExtensionOptions.md)

Defined in: packages/vite-plugin-vscode/src/types.ts:52

extension vite config.

***

### recommended?

> `optional` **recommended?**: `boolean`

Defined in: packages/vite-plugin-vscode/src/types.ts:60

Recommended switch. Default is true.
if true, will have the following default behavior:
- will change the extension/webview outDir to be parallel outDir;
- if vite build.outDir is 'dist', will change extension/webview to 'dist/extension' and 'dist/webview'

#### Default

```ts
true
```

***

### webview?

> `optional` **webview?**: `string` \| `boolean` \| [`WebviewOption`](WebviewOption.md)

Defined in: packages/vite-plugin-vscode/src/types.ts:76

During development, inject code into both `vscode extension code` and `web page` code to support `HMR`;

During production builds, inject the final generated `index.html` code into the `vscode extension code` to minimize manual effort.

#### Example

extension file
```ts
import {getWebviewHtml} from 'virtual:vscode';

function setupHtml(webview: Webview, context: ExtensionContext) {
 return getWebviewHtml({serverUrl:process.env.VITE_DEV_SERVER_URL, webview, context});
}
```
