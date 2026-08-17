[**vscode-plugin-monorepo**](../../../README.md)

***

[vscode-plugin-monorepo](../../../README.md) / [vscode-utils/src](../README.md) / NlsI18n

# Interface: NlsI18n

Defined in: packages/vscode-utils/src/i18n.ts:39

Read i18n messages from package.nls.json

## Properties

### t

> **t**: (`message`, ...`args`) => `string` & (`message`, `args`) => `string` & (...`params`) => `string`

Defined in: packages/vscode-utils/src/i18n.ts:54

Marks a string for localization. If a localized bundle is available for the language specified by
env.language and the bundle has a localized value for this message, then that localized
value will be returned (with injected args values for any templated values).

#### Param

**message**

The message to localize. Supports index templating where strings like `{0}` and `{1}` are
replaced by the item at that index in the args array.

#### Param

**args**

The arguments to be used in the localized string. The index of the argument is used to
match the template placeholder in the localized string.

#### Returns

localized string with injected arguments.

#### Example

```ts
i18n.t('Hello {0}!', 'World');
```

***

### use

> **use**: (`messages`) => `void` & (`extensionPath`, `language?`) => `void`

Defined in: packages/vscode-utils/src/i18n.ts:65

Loads the nls messages for the given messages.

#### Param

**messages**

The messages to use.
