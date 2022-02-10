---
id: "modules"
title: "@code-rub/core"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Interfaces

- [CodeRubPlugin](interfaces/CodeRubPlugin)
- [FileAssignment](interfaces/FileAssignment)
- [RawConfig](interfaces/RawConfig)
- [ResolvedConfig](interfaces/ResolvedConfig)
- [StatusUpdate](interfaces/StatusUpdate)

## Type aliases

### Awaitable

Ƭ **Awaitable**<`T`\>: `Promise`<`T`\> \| `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[models/plugin.interface.ts:6](https://github.com/agentender/code-rub/blob/main/packages/core/src/models/plugin.interface.ts#L6)

___

### ProvidedConfig

Ƭ **ProvidedConfig**: `Partial`<[`RawConfig`](interfaces/RawConfig)\>

**`description`** An interface representing that any config option may be missing when provided by the user

#### Defined in

[models/config.interface.ts:6](https://github.com/agentender/code-rub/blob/main/packages/core/src/models/config.interface.ts#L6)

## Functions

### configFileName

▸ **configFileName**(): `string`

#### Returns

`string`

#### Defined in

[lib/utils/path.ts:6](https://github.com/agentender/code-rub/blob/main/packages/core/src/lib/utils/path.ts#L6)

___

### deepClone

▸ **deepClone**<`T`\>(`obj`): `T`

**`description`** Produces a deep clone (no references to original object or child objects) of the provided object or array.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `Object` \| `unknown`[] |

#### Returns

`T`

#### Defined in

[lib/utils/object.ts:11](https://github.com/agentender/code-rub/blob/main/packages/core/src/lib/utils/object.ts#L11)

___

### deepMerge

▸ **deepMerge**<`T1`, `T2`\>(`obj1`, `obj2`): `T1` & `T2`

#### Type parameters

| Name |
| :------ |
| `T1` |
| `T2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj1` | `T1` |
| `obj2` | `T2` |

#### Returns

`T1` & `T2`

#### Defined in

[lib/utils/object.ts:31](https://github.com/agentender/code-rub/blob/main/packages/core/src/lib/utils/object.ts#L31)

___

### extendedRequire

▸ **extendedRequire**(`path`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`any`

#### Defined in

[lib/utils/require.ts:9](https://github.com/agentender/code-rub/blob/main/packages/core/src/lib/utils/require.ts#L9)

___

### repoRootPath

▸ **repoRootPath**(): `string`

#### Returns

`string`

#### Defined in

[lib/utils/path.ts:14](https://github.com/agentender/code-rub/blob/main/packages/core/src/lib/utils/path.ts#L14)

___

### resolve

▸ **resolve**(`path`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`string`

#### Defined in

[lib/utils/require.ts:5](https://github.com/agentender/code-rub/blob/main/packages/core/src/lib/utils/require.ts#L5)

___

### resolvePlugin

▸ **resolvePlugin**<`T`\>(`p`): [`CodeRubPlugin`](interfaces/CodeRubPlugin)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `p` | `string` \| [`CodeRubPlugin`](interfaces/CodeRubPlugin)<`T`\> |

#### Returns

[`CodeRubPlugin`](interfaces/CodeRubPlugin)<`T`\>

#### Defined in

[lib/utils/resolve-plugin.ts:6](https://github.com/agentender/code-rub/blob/main/packages/core/src/lib/utils/resolve-plugin.ts#L6)

___

### worker

▸ **worker**(`updateObserver?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `updateObserver?` | `Observer`<[`StatusUpdate`](interfaces/StatusUpdate)\> |

#### Returns

`Promise`<`void`\>

#### Defined in

[lib/main.ts:12](https://github.com/agentender/code-rub/blob/main/packages/core/src/lib/main.ts#L12)
