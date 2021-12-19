---
id: "modules"
title: "code-rub"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Interfaces

- [GenerateOptions](interfaces/GenerateOptions)
- [InitArgs](interfaces/InitArgs)

## Functions

### generate

▸ **generate**(`options`): `Promise`<`void`\>

**`description`** Call through to the @code-rub/core package to generate the next set of assignments

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`GenerateOptions`](interfaces/GenerateOptions) |

#### Returns

`Promise`<`void`\>

#### Defined in

[lib/commands/generate.ts:9](https://github.com/agentender/code-rub/blob/944960b/packages/code-rub/src/lib/commands/generate.ts#L9)

___

### init

▸ **init**(`Arguments`): `Promise`<`void`\>

Initialize a new configuration file for code rub, setting up packages if needed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `Arguments` | [`InitArgs`](interfaces/InitArgs) | see [InitArgs](interfaces/InitArgs) |

#### Returns

`Promise`<`void`\>

#### Defined in

[lib/commands/init/init.ts:33](https://github.com/agentender/code-rub/blob/944960b/packages/code-rub/src/lib/commands/init/init.ts#L33)
