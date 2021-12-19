---
id: "CodeRubPlugin"
title: "Interface: CodeRubPlugin<ConfigType>"
sidebar_label: "CodeRubPlugin"
sidebar_position: 0
custom_edit_url: null
---

**`description`** A plugin should export this using either `module.exports = {...}` or `export = {...}`

## Type parameters

| Name | Description |
| :------ | :------ |
| `ConfigType` | A type parameter, representing the typing for the plugin's configuration object |

## Properties

### initialConfiguration

• `Optional` **initialConfiguration**: () => [`Awaitable`](../modules#awaitable)<`Partial`<[`RawConfig`](RawConfig)\>\> \| [`Awaitable`](../modules#awaitable)<`Partial`<[`RawConfig`](RawConfig)\>\>

**`description`** This is either a configuration object that is used during `npx code-rub init --preset {my-plugin}` or a function to create that object.

#### Defined in

[models/plugin.interface.ts:71](https://github.com/agentender/code-rub/blob/3647cc9/packages/core/src/models/plugin.interface.ts#L71)

___

### name

• **name**: `string`

**`description`** Used for labeling the plugin in handled error messages

#### Defined in

[models/plugin.interface.ts:16](https://github.com/agentender/code-rub/blob/3647cc9/packages/core/src/models/plugin.interface.ts#L16)

## Methods

### processAssignments

▸ `Optional` **processAssignments**(`assignments`, `config`): [`Awaitable`](../modules#awaitable)<`void` \| [`FileAssignment`](FileAssignment)[]\>

**`description`** This function is multipurpose. It can be used in plugins like `@code-rub/jira` to submit tickets to a service, or can modify the assignments to before other plugins are called.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `assignments` | [`FileAssignment`](FileAssignment)[] | This is the current list of assignments. They can be modified or used directly. |
| `config` | `ConfigType` | This is the config for the currently executing plugin |

#### Returns

[`Awaitable`](../modules#awaitable)<`void` \| [`FileAssignment`](FileAssignment)[]\>

Either a list of file assignments to use in further plugin execution, or nothing.

#### Defined in

[models/plugin.interface.ts:40](https://github.com/agentender/code-rub/blob/3647cc9/packages/core/src/models/plugin.interface.ts#L40)

___

### processFileQueue

▸ `Optional` **processFileQueue**(`files`, `config`): `string`[]

**`description`** This list is used to filter **after** the file list has been read. It can be used to check file types, file names etc and filter things down.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `files` | `string`[] | This is the lst of files being for your plugin. It should be used to generate the next list or directly modified. |
| `config` | `ConfigType` | This is the config for the currently executing plugin |

#### Returns

`string`[]

A list of file paths that will be used in the next plugin or to generate assignments directly.

#### Defined in

[models/plugin.interface.ts:32](https://github.com/agentender/code-rub/blob/3647cc9/packages/core/src/models/plugin.interface.ts#L32)

___

### processIgnore

▸ `Optional` **processIgnore**(`ig`, `config`): `Ignore`

**`description`** This is controls the generation file queue during crawling. It is more performant to filter during this by updating the `Ignore` object, but may not be suitable in multi-team environments since this affects which files are saved in the file-map. If using a different set of Ignore processing plugins, it is recommended to also change the storage output directory to something like `.code-rub/{teamName}`, and maintain that list separately across teams.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ig` | `Ignore` | This represents the current `Ignore` instance, it should be used during implementation to update the files being ignored. |
| `config` | `ConfigType` | This is the config for the currently executing plugin |

#### Returns

`Ignore`

`Ignore` This is the modified `Ignore` instance, which will be fed into the next executed plugin or used directly.

#### Defined in

[models/plugin.interface.ts:24](https://github.com/agentender/code-rub/blob/3647cc9/packages/core/src/models/plugin.interface.ts#L24)

___

### readFileMap

▸ `Optional` **readFileMap**(`config`): `Record`<`string`, `boolean`\>

**`description`** This function is used to read the fileMap before generating assignments. Only 1 plugin should implement this. If none do, we default to read from a CSV file in the storage location.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`ResolvedConfig`](ResolvedConfig) | This is the config for the instance of @code-rub core that is executing. See [ResolvedConfig](ResolvedConfig) |

#### Returns

`Record`<`string`, `boolean`\>

A Map between file path and a boolean representing if the file has been seen. This should be read inside this function.

#### Defined in

[models/plugin.interface.ts:60](https://github.com/agentender/code-rub/blob/3647cc9/packages/core/src/models/plugin.interface.ts#L60)

___

### saveFileMap

▸ `Optional` **saveFileMap**(`fileMap`, `config`): `void`

**`description`** This function is used to save the fileMap for ensuring that the same files are not picked sequentially. Only 1 plugin should implement this. If none do, we default to saving to a CSV file in the storage location.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fileMap` | `Record`<`string`, `boolean`\> | This is a Map between file path and a boolean representing if the file has been seen. This should be saved inside this function. |
| `config` | [`ResolvedConfig`](ResolvedConfig) | This is the config for the instance of @code-rub core that is executing. See [ResolvedConfig](ResolvedConfig) |

#### Returns

`void`

#### Defined in

[models/plugin.interface.ts:50](https://github.com/agentender/code-rub/blob/3647cc9/packages/core/src/models/plugin.interface.ts#L50)

___

### setup

▸ `Optional` **setup**(`config`): [`Awaitable`](../modules#awaitable)<`void`\>

**`description`** This is a setup function that is called while resolving plugins. You can use it to prompt for user inputs, or any miscellaneous actions that need to happen for your specific plugin to work.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | `ConfigType` | This is the config for the instance of @code-rub core that is executing. See [ResolvedConfig](ResolvedConfig) |

#### Returns

[`Awaitable`](../modules#awaitable)<`void`\>

#### Defined in

[models/plugin.interface.ts:66](https://github.com/agentender/code-rub/blob/3647cc9/packages/core/src/models/plugin.interface.ts#L66)
