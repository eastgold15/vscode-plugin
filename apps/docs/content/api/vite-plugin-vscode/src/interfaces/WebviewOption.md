[**vscode-plugin-monorepo**](../../../README.md)

***

[vscode-plugin-monorepo](../../../README.md) / [vite-plugin-vscode/src](../README.md) / WebviewOption

# Interface: WebviewOption

Defined in: packages/vite-plugin-vscode/src/types.ts:29

vscode webview options.

## Properties

### csp?

> `optional` **csp?**: `string`

Defined in: packages/vite-plugin-vscode/src/types.ts:33

The CSP meta for the webview. Default is `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src {{cspSource}} 'unsafe-inline'; script-src 'nonce-{{nonce}}' 'unsafe-eval';">`
