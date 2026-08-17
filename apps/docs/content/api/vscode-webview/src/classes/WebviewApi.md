[**vscode-plugin-monorepo**](../../../README.md)

***

[vscode-plugin-monorepo](../../../README.md) / [vscode-webview/src](../README.md) / WebviewApi

# Class: WebviewApi\<StateType\>

Defined in: packages/vscode-webview/src/index.ts:53

A utility wrapper around the acquireVsCodeApi() function, which enables
message passing and state management between the webview and extension
contexts.

## Type Parameters

### StateType

`StateType` = `any`

## Constructors

### Constructor

> **new WebviewApi**\<`StateType`\>(`options?`): `WebviewApi`\<`StateType`\>

Defined in: packages/vscode-webview/src/index.ts:63

#### Parameters

##### options?

[`PostMessageOptions`](../type-aliases/PostMessageOptions.md)

#### Returns

`WebviewApi`\<`StateType`\>

## Methods

### getState()

> **getState**(): `StateType` \| `undefined`

Defined in: packages/vscode-webview/src/index.ts:227

Get the persistent state stored for this webview.

#### Returns

`StateType` \| `undefined`

The current state or `undefined` if no state has been set.

***

### off()

> **off**(`type`): `void`

Defined in: packages/vscode-webview/src/index.ts:210

Remove a listener for a message type

#### Parameters

##### type

`string` \| `number`

the message type

#### Returns

`void`

***

### on()

> **on**\<`T`\>(`type`, `success`, `fail?`): `void`

Defined in: packages/vscode-webview/src/index.ts:198

Register a listener for a message type

#### Type Parameters

##### T

`T`

#### Parameters

##### type

`string` \| `number`

the message type

##### success

[`PostMessageListener`](../type-aliases/PostMessageListener.md)\<`T`\>

the success listener

##### fail?

[`PostMessageListener`](../type-aliases/PostMessageListener.md)\<`any`\>

the fail listener

#### Returns

`void`

***

### post()

> **post**(`type`, `data`): `void`

Defined in: packages/vscode-webview/src/index.ts:131

Post a message to the owner of the webview

#### Parameters

##### type

`string` \| `number`

the message type

##### data

`any`

the message content

#### Returns

`void`

***

### postAndReceive()

> **postAndReceive**\<`T`\>(`type`, `data`, `options?`): `Promise`\<`T`\>

Defined in: packages/vscode-webview/src/index.ts:141

Post a message to the owner of the webview, and return the response. The type of the message to be sent and received must be the same.

#### Type Parameters

##### T

`T`

#### Parameters

##### type

`string` \| `number`

the message type

##### data

`any`

the message content

##### options?

[`PostMessageAsyncOptions`](../interfaces/PostMessageAsyncOptions.md)

#### Returns

`Promise`\<`T`\>

***

### postMessage()

> **postMessage**\<`T`\>(`message`): `void`

Defined in: packages/vscode-webview/src/index.ts:218

Post a message to the owner of the webview

#### Type Parameters

##### T

`T` = `any`

#### Parameters

##### message

`T`

the message content

#### Returns

`void`

***

### setOptions()

> **setOptions**(`options`): `void`

Defined in: packages/vscode-webview/src/index.ts:86

set the post message options

#### Parameters

##### options

[`PostMessageOptions`](../type-aliases/PostMessageOptions.md)

#### Returns

`void`

***

### setState()

> **setState**\<`T`\>(`newState`): `T`

Defined in: packages/vscode-webview/src/index.ts:239

Set the persistent state stored for this webview.

#### Type Parameters

##### T

`T`

#### Parameters

##### newState

`T`

New persisted state. This must be a JSON serializable object. Can be retrieved
using [getState](#getstate).

#### Returns

`T`

The new state.
