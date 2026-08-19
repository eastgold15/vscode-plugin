[**vscode-plugin-monorepo**](../../../README.md)

***

[vscode-plugin-monorepo](../../../README.md) / [vite-plugin-vscode/src](../README.md) / WebviewOption

# Interface: WebviewOption

Defined in: [packages/vite-plugin-vscode/src/types.ts:29](https://github.com/eastgold15/vscode-plugin/blob/ef178bfe0f64f9c1a79a1fb8f482d0808aad45ba/packages/vite-plugin-vscode/src/types.ts#L29)

vscode webview options.

## Properties

### csp?

> `optional` **csp?**: `string`

Defined in: [packages/vite-plugin-vscode/src/types.ts:33](https://github.com/eastgold15/vscode-plugin/blob/ef178bfe0f64f9c1a79a1fb8f482d0808aad45ba/packages/vite-plugin-vscode/src/types.ts#L33)

The CSP meta for the webview. Default is `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src {{cspSource}} 'unsafe-inline'; script-src 'nonce-{{nonce}}' 'unsafe-eval';">`
