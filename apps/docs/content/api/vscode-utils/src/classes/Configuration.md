[**vscode-plugin-monorepo**](../../../README.md)

***

[vscode-plugin-monorepo](../../../README.md) / [vscode-utils/src](../README.md) / Configuration

# Class: Configuration\<T\>

Defined in: packages/vscode-utils/src/configuration.ts:26

## Type Parameters

### T

`T`

## Constructors

### Constructor

> **new Configuration**\<`T`\>(`identifier`, `defaultValues?`): `Configuration`\<`T`\>

Defined in: packages/vscode-utils/src/configuration.ts:30

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

Defined in: packages/vscode-utils/src/configuration.ts:35

#### Returns

`WorkspaceConfiguration`

***

### get()

> **get**\<`V`\>(`section`, `defaultValue?`): `V` \| `undefined`

Defined in: packages/vscode-utils/src/configuration.ts:45

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

Defined in: packages/vscode-utils/src/configuration.ts:78

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

Defined in: packages/vscode-utils/src/configuration.ts:93

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

Defined in: packages/vscode-utils/src/configuration.ts:55

Get all Configuration values.

#### Returns

`T`
