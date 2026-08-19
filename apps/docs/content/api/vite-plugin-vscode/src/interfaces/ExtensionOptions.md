[**vscode-plugin-monorepo**](../../../README.md)

***

[vscode-plugin-monorepo](../../../README.md) / [vite-plugin-vscode/src](../README.md) / ExtensionOptions

# Interface: ExtensionOptions

Defined in: [packages/vite-plugin-vscode/src/types.ts:6](https://github.com/eastgold15/vscode-plugin/blob/ef178bfe0f64f9c1a79a1fb8f482d0808aad45ba/packages/vite-plugin-vscode/src/types.ts#L6)

vscode extension options. See [tsdown](https://tsdown.dev/) and [Config Options](https://tsdown.dev/reference/config-options) for more information.

## Extends

- `Omit`\<`InlineConfig`, `"entry"` \| `"format"` \| `"outDir"` \| `"watch"`\>

## Properties

### alias?

> `optional` **alias?**: `Record`\<`string`, `string`\>

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:998

#### Inherited from

`Omit.alias`

***

### attw?

> `optional` **attw?**: `WithEnabled`\<`AttwOptions`\>

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1338

Run `arethetypeswrong` after bundling.
Requires `@arethetypeswrong/core` to be installed.

#### Default

```ts
false
```

#### See

https://github.com/arethetypeswrong/arethetypeswrong.github.io

#### Inherited from

`Omit.attw`

***

### banner?

> `optional` **banner?**: `ChunkAddon`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1196

#### Inherited from

`Omit.banner`

***

### ~~bundle?~~

> `optional` **bundle?**: `boolean`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1433

#### Deprecated

Use [`unbundle`](#unbundle) instead.

#### Default

```ts
true
```

#### Inherited from

`Omit.bundle`

***

### checks?

> `optional` **checks?**: `ChecksOptions` & `object`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1136

Controls which warnings are emitted during the build process. Each option can be set to `true` (emit warning) or `false` (suppress warning).

#### Type Declaration

##### legacyCjs?

> `optional` **legacyCjs?**: `boolean`

If the config includes the `cjs` format and
one of its target >= node 20.19.0 / 22.12.0,
warn the user about the deprecation of CommonJS.

###### Default

```ts
true
```

#### Inherited from

`Omit.checks`

***

### cjsDefault?

> `optional` **cjsDefault?**: `boolean`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1240

Converts a single default export from an explicit CJS entry module to
`module.exports`. It does not apply to non-entry chunks emitted in
unbundle mode.

#### Default

```ts
true
```

#### Inherited from

`Omit.cjsDefault`

***

### clean?

> `optional` **clean?**: `boolean` \| `string`[]

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1190

Clean directories before build.

Default to output directory.

#### Default

```ts
true
```

#### Inherited from

`Omit.clean`

***

### concurrency?

> `optional` **concurrency?**: `number`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1465

Maximum number of Rolldown builds to run in parallel.

#### Inherited from

`Omit.concurrency`

***

### config?

> `optional` **config?**: `string` \| `boolean`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1452

Config file path

#### Inherited from

`Omit.config`

***

### configLoader?

> `optional` **configLoader?**: `"auto"` \| `"native"` \| `"tsx"` \| `"unrun"`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1457

Config loader to use. It can only be set via CLI or API.

#### Default

```ts
'auto'
```

#### Inherited from

`Omit.configLoader`

***

### copy?

> `optional` **copy?**: `CopyOptions` \| `CopyOptionsFn`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1377

Copy files to another directory.

#### Example

```ts
[
  'src/assets',
  'src/env.d.ts',
  'src/styles/**/*.css',
  { from: 'src/assets', to: 'dist/assets' },
  { from: 'src/styles/**/*.css', to: 'dist', flatten: true },
]
```

#### Inherited from

`Omit.copy`

***

### css?

> `optional` **css?**: `any`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1363

**[experimental]** CSS options.
Requires `@tsdown/css` to be installed.

#### Inherited from

`Omit.css`

***

### customLogger?

> `optional` **customLogger?**: `Logger`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1282

Custom logger.

#### Inherited from

`Omit.customLogger`

***

### cwd?

> `optional` **cwd?**: `string`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1254

The working directory of the config file.
- Defaults to process.cwd \| process.cwd() for root config.
- Defaults to the package directory for [`workspace`](#workspace) config.

#### Default

```ts
process.cwd()
```

#### Inherited from

`Omit.cwd`

***

### define?

> `optional` **define?**: `Record`\<`string`, `string`\>

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1069

#### Inherited from

`Omit.define`

***

### deps?

> `optional` **deps?**: `DepsConfig`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:997

Dependency handling options.

#### Inherited from

`Omit.deps`

***

### devtools?

> `optional` **devtools?**: `WithEnabled`\<`DevtoolsOptions`\>

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1305

**[experimental]** Enable devtools.

DevTools is still under development, and this is for early testers only.

This may slow down the build process significantly.

#### Default

```ts
false
```

#### Inherited from

`Omit.devtools`

***

### dts?

> `optional` **dts?**: `WithEnabled`\<`DtsOptions`\>

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1318

Enables generation of TypeScript declaration files (`.d.ts`).

By default, this option is auto-detected based on your project's `package.json`:
- If [`exe`](#exe) is enabled, declaration file generation is disabled by default.
- If the `types` field is present, or if the main `exports` contains a `types` entry, declaration file generation is enabled by default.
- Otherwise, declaration file generation is disabled by default.

#### Inherited from

`Omit.dts`

***

### entry?

> `optional` **entry?**: `string`

Defined in: [packages/vite-plugin-vscode/src/types.ts:12](https://github.com/eastgold15/vscode-plugin/blob/ef178bfe0f64f9c1a79a1fb8f482d0808aad45ba/packages/vite-plugin-vscode/src/types.ts#L12)

The extension entry file.

#### Default

```ts
"extension/index.ts"
```

***

### env?

> `optional` **env?**: `Record`\<`string`, `any`\>

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1057

Compile-time env variables, which can be accessed via `import.meta.env` or `process.env`.

#### Example

```json
{
  "DEBUG": true,
  "NODE_ENV": "production"
}
```

#### Default

```ts
{}
```

#### Inherited from

`Omit.env`

***

### envFile?

> `optional` **envFile?**: `string`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1063

Path to env file providing compile-time env variables.

#### Example

```ts
`.env`, `.env.production`, etc.
```

#### Inherited from

`Omit.envFile`

***

### envPrefix?

> `optional` **envPrefix?**: `string` \| `string`[]

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1068

When loading env variables from `envFile`, only include variables with these prefixes.

#### Default

```ts
'TSDOWN_'
```

#### Inherited from

`Omit.envPrefix`

***

### exe?

> `optional` **exe?**: `WithEnabled`\<`ExeOptions`\>

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1387

**[experimental]** Bundle as executable using Node.js SEA (Single Executable Applications).

This will bundle the output into a single executable file using Node.js SEA.
Note that this is only supported on Node.js 25.7.0 and later, and is not supported in Bun or Deno.

#### Default

```ts
false
```

#### Inherited from

`Omit.exe`

***

### exports?

> `optional` **exports?**: `WithEnabled`\<`ExportsOptions`\>

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1358

Generate package exports for `package.json`.

This will set the `exports` field in `package.json` to point to the
generated files.

#### Default

```ts
false
```

#### Inherited from

`Omit.exports`

***

### ~~external?~~

> `optional` **external?**: `string` \| `RegExp` \| (`string` \| `RegExp`)[] \| `ExternalOptionFunction`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1396

#### Deprecated

Use DepsConfig.neverBundle \| deps.neverBundle instead.

#### Inherited from

`Omit.external`

***

### failOnWarn?

> `optional` **failOnWarn?**: `boolean` \| `CIOption`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1270

If true, fails the build on warnings.

#### Default

```ts
false
```

#### Inherited from

`Omit.failOnWarn`

***

### filter?

> `optional` **filter?**: `RegExp` \| `Arrayable`\<`string`\>

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1461

Filter configs by cwd or name.

#### Inherited from

`Omit.filter`

***

### fixedExtension?

> `optional` **fixedExtension?**: `boolean`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1222

Use a fixed extension for output files.
The extension will always be `.cjs` or `.mjs`.
Otherwise, it will depend on the package type.

Defaults to `true` if [`platform`](#platform) is set to `node`,
`false` otherwise.

#### Default

```ts
platform === 'node'
```

#### Inherited from

`Omit.fixedExtension`

***

### footer?

> `optional` **footer?**: `ChunkAddon`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1195

#### Inherited from

`Omit.footer`

***

### fromVite?

> `optional` **fromVite?**: `boolean` \| `"vitest"`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1287

Reuse config from Vite or Vitest (experimental)

#### Default

```ts
false
```

#### Inherited from

`Omit.fromVite`

***

### globalName?

> `optional` **globalName?**: `string`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1163

#### Inherited from

`Omit.globalName`

***

### globImport?

> `optional` **globImport?**: `boolean`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1349

`import.meta.glob` support.

#### See

https://vite.dev/guide/features.html#glob-import

#### Default

```ts
true
```

#### Inherited from

`Omit.globImport`

***

### hash?

> `optional` **hash?**: `boolean`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1232

If enabled, appends hash to chunk filenames.

#### Default

```ts
true
```

#### Inherited from

`Omit.hash`

***

### hooks?

> `optional` **hooks?**: `Partial`\<`TsdownHooks`\> \| ((`hooks`) => `Awaitable`\<`void`\>)

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1378

#### Inherited from

`Omit.hooks`

***

### ignoreWatch?

> `optional` **ignoreWatch?**: `Arrayable`\<`string` \| `RegExp`\>

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1295

Files or patterns to not watch while in watch mode.

#### Inherited from

`Omit.ignoreWatch`

***

### ~~injectStyle?~~

> `optional` **injectStyle?**: `boolean`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1441

#### Deprecated

Use CssOptions.inject \| css.inject instead.

#### Inherited from

`Omit.injectStyle`

***

### ~~inlineOnly?~~

> `optional` **inlineOnly?**: `false` \| `Arrayable`\<`string` \| `RegExp`\>

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1404

#### Deprecated

Use DepsConfig.onlyBundle \| deps.onlyBundle instead.

#### Inherited from

`Omit.inlineOnly`

***

### inputOptions?

> `optional` **inputOptions?**: `InputOptions` \| ((`options`, `format`, `context`) => `Awaitable`\<`void` \| `InputOptions` \| `null`\>)

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1150

Use with caution; ensure you understand the implications.

#### Inherited from

`Omit.inputOptions`

***

### loader?

> `optional` **loader?**: `ModuleTypes`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1089

Sets how input files are processed.
For example, use 'js' to treat files as JavaScript or 'base64' for images.
Lets you import or require files like images or fonts.

#### Example

```json
{ ".jpg": "asset", ".png": "base64" }
```

#### Inherited from

`Omit.loader`

***

### logLevel?

> `optional` **logLevel?**: `LogLevel`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1265

Log level.

#### Default

```ts
'info'
```

#### Inherited from

`Omit.logLevel`

***

### minify?

> `optional` **minify?**: `boolean` \| `"dce-only"` \| `MinifyOptions`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1194

#### Default

```ts
false
```

#### Inherited from

`Omit.minify`

***

### name?

> `optional` **name?**: `string`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1260

The name to show in CLI output. This is useful for monorepos or workspaces.
When using workspace mode, this option defaults to the package name from package.json.
In non-workspace mode, this option must be set explicitly for the name to show in the CLI output.

#### Inherited from

`Omit.name`

***

### nodeProtocol?

> `optional` **nodeProtocol?**: `boolean` \| `"strip"`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1132

Control whether built-in Node.js module imports use the `node:` protocol.

- `true`: Add the `node:` prefix to built-in module imports.
- `'strip'`: Remove the `node:` prefix from built-in module imports.
- `false`: Do not transform built-in module imports.

#### Default

```ts
false
```

#### Examples

<caption>`nodeProtocol: true` — add the `node:` prefix</caption>

```ts
// Input
import 'fs'

// Output
import 'node:fs'
```

<caption>`nodeProtocol: 'strip'` — remove the `node:` prefix</caption>

```ts
// Input
import 'node:fs'

// Output
import 'fs'
```

<caption>`nodeProtocol: false` — do not transform imports</caption>

```ts
// Input
import 'node:fs'

// Output
import 'node:fs'
```

#### Inherited from

`Omit.nodeProtocol`

***

### ~~noExternal?~~

> `optional` **noExternal?**: `Arrayable`\<`string` \| `RegExp`\> \| `NoExternalFn`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1400

#### Deprecated

Use DepsConfig.alwaysBundle \| deps.alwaysBundle instead.

#### Inherited from

`Omit.noExternal`

***

### onSuccess?

> `optional` **onSuccess?**: `string` \| ((`config`, `signal`) => `void` \| `Promise`\<`void`\>)

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1309

You can specify command to be executed after a successful build, specially useful for Watch mode

#### Inherited from

`Omit.onSuccess`

***

### outDir?

> `optional` **outDir?**: `string`

Defined in: [packages/vite-plugin-vscode/src/types.ts:17](https://github.com/eastgold15/vscode-plugin/blob/ef178bfe0f64f9c1a79a1fb8f482d0808aad45ba/packages/vite-plugin-vscode/src/types.ts#L17)

The output directory for the extension files. Default is `dist-extension`.

#### Default

```ts
"dist-extension"
```

***

### ~~outExtension?~~

> `optional` **outExtension?**: `OutExtensionFactory`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1437

#### Deprecated

Use [`outExtensions`](#outextensions) instead.

#### Inherited from

`Omit.outExtension`

***

### outExtensions?

> `optional` **outExtensions?**: `OutExtensionFactory`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1227

Custom extensions for output files.
[`fixedExtension`](#fixedextension) will be overridden by this option.

#### Inherited from

`Omit.outExtensions`

***

### outputOptions?

> `optional` **outputOptions?**: `OutputOptions` \| ((`options`, `format`, `context`) => `Awaitable`\<`void` \| `OutputOptions` \| `null`\>)

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1244

Use with caution; ensure you understand the implications.

#### Inherited from

`Omit.outputOptions`

***

### platform?

> `optional` **platform?**: `"node"` \| `"neutral"` \| `"browser"`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1014

Specifies the target runtime platform for the build.

- `node`: Node.js and compatible runtimes (e.g., Deno, Bun).
  For CJS format, this is always set to `node` and cannot be changed.
- `neutral`: A platform-agnostic target with no specific runtime assumptions.
- `browser`: Web browsers.

#### Default

```ts
'node'
```

#### See

https://tsdown.dev/options/platform

#### Inherited from

`Omit.platform`

***

### plugins?

> `optional` **plugins?**: `TsdownPluginOption`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1146

#### Inherited from

`Omit.plugins`

***

### ~~publicDir?~~

> `optional` **publicDir?**: `CopyOptions` \| `CopyOptionsFn`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1446

#### Alias

copy

#### Deprecated

Alias for [`copy`](#copy), will be removed in the future.

#### Inherited from

`Omit.publicDir`

***

### publint?

> `optional` **publint?**: `WithEnabled`\<`PublintOptions`\>

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1330

Run `publint` after bundling.
Requires `publint` to be installed.

#### Default

```ts
false
```

#### Inherited from

`Omit.publint`

***

### ~~removeNodeProtocol?~~

> `optional` **removeNodeProtocol?**: `boolean`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1428

Remove the `node:` prefix from built-in Node.js module imports.
When enabled, rewrites import sources like `node:fs` to `fs`.

#### Default

```ts
false
```

#### Deprecated

Use [`nodeProtocol: 'strip'`](#nodeprotocol) instead.

#### Example

<caption>`removeNodeProtocol: true` — remove the `node:` prefix</caption>

```ts
// Input
import 'node:fs'

// Output
import 'fs'
```

#### Inherited from

`Omit.removeNodeProtocol`

***

### report?

> `optional` **report?**: `WithEnabled`\<`ReportOptions`\>

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1343

Enable size reporting after bundling.

#### Default

```ts
true
```

#### Inherited from

`Omit.report`

***

### root?

> `optional` **root?**: `string`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1211

Specifies the root directory of input files, similar to TypeScript's `rootDir`.
This determines the output directory structure.

By default, the root is computed as the common base directory of all entry files.

#### See

https://www.typescriptlang.org/tsconfig/#rootDir

#### Inherited from

`Omit.root`

***

### shims?

> `optional` **shims?**: `boolean`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1073

#### Default

```ts
false
```

#### Inherited from

`Omit.shims`

***

### ~~skipNodeModulesBundle?~~

> `optional` **skipNodeModulesBundle?**: `boolean`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1409

#### Deprecated

Use DepsConfig.neverBundle \| deps.neverBundle: true instead.

#### Default

```ts
false
```

#### Inherited from

`Omit.skipNodeModulesBundle`

***

### sourcemap?

> `optional` **sourcemap?**: `Sourcemap`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1183

Whether to generate source map files.

Note that this option will always be `true` if you have
[\`declarationMap\`](https://www.typescriptlang.org/tsconfig/#declarationMap)
option enabled in your `tsconfig.json`.

#### Default

```ts
false
```

#### Inherited from

`Omit.sourcemap`

***

### suppressWarnings?

> `optional` **suppressWarnings?**: `Arrayable`\<`string` \| `RegExp`\> \| ((`msg`) => `boolean`)

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1278

Suppress warnings whose message matches the given pattern(s).

Accepts a string (substring match), a `RegExp`, an array of either, or a
predicate function. Matched warnings are dropped before `failOnWarn` is
applied, so they won't fail the build.

#### Inherited from

`Omit.suppressWarnings`

***

### target?

> `optional` **target?**: `string` \| `false` \| `string`[]

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1044

Specifies the compilation target environment(s).

Determines the JavaScript version or runtime(s) for which the code should be compiled.
If not set, defaults to the value of `engines.node` in your project's `package.json`.
If no `engines.node` field exists, no syntax transformations are applied.

Accepts a single target (e.g., `'es2020'`, `'node18'`, `'baseline-widely-available'`), an array of targets, or `false` to disable all transformations.

#### See

[https://tsdown.dev/options/target#supported-targets](https://tsdown.dev/options/target#supported-targets) for a list of valid targets and more details.

#### Examples

```jsonc
// Target a single environment
{ "target": "node18" }
```

```jsonc
// Target multiple environments
{ "target": ["node18", "es2020"] }
```

```jsonc
// Disable all syntax transformations
{ "target": false }
```

#### Inherited from

`Omit.target`

***

### treeshake?

> `optional` **treeshake?**: `boolean` \| `TreeshakingOptions`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1079

Configure tree shaking options.

#### See

[https://rolldown.rs/reference/InputOptions.treeshake](https://rolldown.rs/reference/InputOptions.treeshake) for more details.

#### Default

```ts
true
```

#### Inherited from

`Omit.treeshake`

***

### tsconfig?

> `optional` **tsconfig?**: `string` \| `boolean`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1002

#### Default

```ts
true
```

#### Inherited from

`Omit.tsconfig`

***

### unbundle?

> `optional` **unbundle?**: `boolean`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1202

Determines whether `unbundle` is enabled.
When set to `true`, the output files will mirror the input file structure.

#### Default

```ts
false
```

#### Inherited from

`Omit.unbundle`

***

### unused?

> `optional` **unused?**: `any`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1324

Enable unused dependencies check with `unplugin-unused`
Requires `unplugin-unused` to be installed.

#### Default

```ts
false
```

#### Inherited from

`Omit.unused`

***

### watchFiles?

> `optional` **watchFiles?**: `string` \| `string`[]

Defined in: [packages/vite-plugin-vscode/src/types.ts:23](https://github.com/eastgold15/vscode-plugin/blob/ef178bfe0f64f9c1a79a1fb8f482d0808aad45ba/packages/vite-plugin-vscode/src/types.ts#L23)

`tsdown` watches the current working directory by default. You can set files that need to be watched, which may improve performance.

If no value is specified, the default value of the "recommended" parameter is ["extension"] when it is true, otherwise it defaults to "true"

***

### workspace?

> `optional` **workspace?**: `true` \| `Arrayable`\<`string`\> \| `Workspace`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1392

**[experimental]** Enable workspace mode.
This allows you to build multiple packages in a monorepo.

#### Inherited from

`Omit.workspace`

***

### write?

> `optional` **write?**: `boolean`

Defined in: node\_modules/tsdown/dist/types-DP3\_0kws.d.mts:1173

Whether to write the files to disk.
This option is incompatible with watch mode.

#### Default

```ts
true
```

#### Inherited from

`Omit.write`
