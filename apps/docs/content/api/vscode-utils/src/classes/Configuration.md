[**vscode-plugin-monorepo**](../../../README.md)

***

[vscode-plugin-monorepo](../../../README.md) / [vscode-utils/src](../README.md) / Configuration

# Class: Configuration\<T\>

Defined in: [packages/vscode-utils/src/configuration.ts:26](https://github.com/eastgold15/vscode-plugin/blob/ef178bfe0f64f9c1a79a1fb8f482d0808aad45ba/packages/vscode-utils/src/configuration.ts#L26)

## Type Parameters

### T

`T`

## Constructors

### Constructor

> **new Configuration**\<`T`\>(`identifier`, `defaultValues?`): `Configuration`\<`T`\>

Defined in: [packages/vscode-utils/src/configuration.ts:30](https://github.com/eastgold15/vscode-plugin/blob/ef178bfe0f64f9c1a79a1fb8f482d0808aad45ba/packages/vscode-utils/src/configuration.ts#L30)

#### Parameters

##### identifier

`string`

##### defaultValues?

`T`

#### Returns

`Configuration`\<`T`\>

## Methods

### configuration()

> **configuration**(): `WorkspaceConfiguration`

Defined in: [packages/vscode-utils/src/configuration.ts:35](https://github.com/eastgold15/vscode-plugin/blob/ef178bfe0f64f9c1a79a1fb8f482d0808aad45ba/packages/vscode-utils/src/configuration.ts#L35)

#### Returns

`WorkspaceConfiguration`

***

### get()

> **get**\<`V`\>(`section`, `defaultValue?`): `V` \| `undefined`

Defined in: [packages/vscode-utils/src/configuration.ts:45](https://github.com/eastgold15/vscode-plugin/blob/ef178bfe0f64f9c1a79a1fb8f482d0808aad45ba/packages/vscode-utils/src/configuration.ts#L45)

Return a value from this configuration.

#### Type Parameters

##### V

`V`

#### Parameters

##### section

`string`

— Configuration name, supports dotted names.

##### defaultValue?

`V`

— A value should be returned when no value could be found, is undefined.

#### Returns

`V` \| `undefined`

— The value section denotes or the default.

***

### update()

#### Call Signature

> **update**(`section`, `value`, `target?`): `Promise`\<`void`\>

Defined in: [packages/vscode-utils/src/configuration.ts:78](https://github.com/eastgold15/vscode-plugin/blob/ef178bfe0f64f9c1a79a1fb8f482d0808aad45ba/packages/vscode-utils/src/configuration.ts#L78)

Update a configuration value. The updated configuration values are persisted.

##### Parameters

###### section

`string`

Configuration name, supports dotted names.

###### value

`any`

The new value.

###### target?

`boolean` \| `ConfigurationTarget` \| `null`

The ConfigurationTarget configuration target or a boolean value. Defaults to `true`
 - If `true` updates ConfigurationTarget.Global Global settings.
 - If `false` updates ConfigurationTarget.Workspace Workspace settings.
 - If `undefined` or `null` updates to ConfigurationTarget.WorkspaceFolder Workspace folder settings if configuration is resource specific,
 otherwise to ConfigurationTarget.Workspace Workspace settings.

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **update**(`values`, `target?`): `Promise`\<`void`\>

Defined in: [packages/vscode-utils/src/configuration.ts:93](https://github.com/eastgold15/vscode-plugin/blob/ef178bfe0f64f9c1a79a1fb8f482d0808aad45ba/packages/vscode-utils/src/configuration.ts#L93)

Update configuration values. The updated configuration values are persisted.

##### Parameters

###### values

`T`

Configuration names and values, supports dotted names.

###### target?

`boolean` \| `ConfigurationTarget` \| `null`

The ConfigurationTarget configuration target or a boolean value. Defaults to `true`
 - If `true` updates ConfigurationTarget.Global Global settings.
 - If `false` updates ConfigurationTarget.Workspace Workspace settings.
 - If `undefined` or `null` updates to ConfigurationTarget.WorkspaceFolder Workspace folder settings if configuration is resource specific,
  otherwise to ConfigurationTarget.Workspace Workspace settings.

##### Returns

`Promise`\<`void`\>

***

### values()

> **values**(): `T`

Defined in: [packages/vscode-utils/src/configuration.ts:55](https://github.com/eastgold15/vscode-plugin/blob/ef178bfe0f64f9c1a79a1fb8f482d0808aad45ba/packages/vscode-utils/src/configuration.ts#L55)

Get all Configuration values.

#### Returns

`T`
