---
id: 'ResolvedConfig'
title: 'Interface: ResolvedConfig'
sidebar_label: 'ResolvedConfig'
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`RawConfig`](RawConfig)

  ↳ **`ResolvedConfig`**

## Properties

### pluginConfiguration

• `Optional` **pluginConfiguration**: `Record`<`string`, `unknown`\>

**`description`** A map between plugin name and the configuration object for that plugin.

#### Inherited from

[RawConfig](RawConfig).[pluginConfiguration](RawConfig#pluginconfiguration)

#### Defined in

[models/config.interface.ts:30](https://github.com/agentender/code-rub/blob/f237c89/packages/core/src/models/config.interface.ts#L30)

---

### plugins

• **plugins**: [`CodeRubPlugin`](CodeRubPlugin)<`unknown`\>[]

#### Overrides

[RawConfig](RawConfig).[plugins](RawConfig#plugins)

#### Defined in

[models/config.interface.ts:40](https://github.com/agentender/code-rub/blob/f237c89/packages/core/src/models/config.interface.ts#L40)

---

### storagePath

• `Optional` **storagePath**: `string`

**`description`** Where should artifacts such as the fileMap be stored and read from during execution?

#### Inherited from

[RawConfig](RawConfig).[storagePath](RawConfig#storagepath)

#### Defined in

[models/config.interface.ts:20](https://github.com/agentender/code-rub/blob/f237c89/packages/core/src/models/config.interface.ts#L20)

---

### tasksPerDeveloper

• `Optional` **tasksPerDeveloper**: `number`

**`description`** How many tasks should be generated per developer?

#### Inherited from

[RawConfig](RawConfig).[tasksPerDeveloper](RawConfig#tasksperdeveloper)

#### Defined in

[models/config.interface.ts:36](https://github.com/agentender/code-rub/blob/f237c89/packages/core/src/models/config.interface.ts#L36)

---

### uids

• **uids**: `string`[]

**`description`** A list of user id's for use when generating assignments.

#### Inherited from

[RawConfig](RawConfig).[uids](RawConfig#uids)

#### Defined in

[models/config.interface.ts:25](https://github.com/agentender/code-rub/blob/f237c89/packages/core/src/models/config.interface.ts#L25)