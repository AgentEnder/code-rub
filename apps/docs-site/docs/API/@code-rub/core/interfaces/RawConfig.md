---
id: "RawConfig"
title: "Interface: RawConfig"
sidebar_label: "RawConfig"
sidebar_position: 0
custom_edit_url: null
---

**`description`** The configuration as provided by the user, with expeced properties

## Hierarchy

- **`RawConfig`**

  ↳ [`ResolvedConfig`](ResolvedConfig)

## Properties

### pluginConfiguration

• `Optional` **pluginConfiguration**: `Record`<`string`, `unknown`\>

**`description`** A map between plugin name and the configuration object for that plugin.

#### Defined in

[models/config.interface.ts:30](https://github.com/agentender/code-rub/blob/3647cc9/packages/core/src/models/config.interface.ts#L30)

___

### plugins

• **plugins**: (`string` \| [`CodeRubPlugin`](CodeRubPlugin)<`unknown`\>)[]

**`description`** A list of strings and inline plugins. The strings are resolved to plugins during execution. See [CodeRubPlugin](CodeRubPlugin)

#### Defined in

[models/config.interface.ts:15](https://github.com/agentender/code-rub/blob/3647cc9/packages/core/src/models/config.interface.ts#L15)

___

### storagePath

• `Optional` **storagePath**: `string`

**`description`** Where should artifacts such as the fileMap be stored and read from during execution?

#### Defined in

[models/config.interface.ts:20](https://github.com/agentender/code-rub/blob/3647cc9/packages/core/src/models/config.interface.ts#L20)

___

### tasksPerDeveloper

• `Optional` **tasksPerDeveloper**: `number`

**`description`** How many tasks should be generated per developer?

#### Defined in

[models/config.interface.ts:36](https://github.com/agentender/code-rub/blob/3647cc9/packages/core/src/models/config.interface.ts#L36)

___

### uids

• **uids**: `string`[]

**`description`** A list of user id's for use when generating assignments.

#### Defined in

[models/config.interface.ts:25](https://github.com/agentender/code-rub/blob/3647cc9/packages/core/src/models/config.interface.ts#L25)
