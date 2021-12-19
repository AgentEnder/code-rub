---
id: "InitArgs"
title: "Interface: InitArgs"
sidebar_label: "InitArgs"
sidebar_position: 0
custom_edit_url: null
---

## Properties

### configFile

• **configFile**: `string`

What should the new configuration file be named?

#### Defined in

[lib/commands/init/init.ts:14](https://github.com/agentender/code-rub/blob/main/packages/code-rub/src/lib/commands/init/init.ts#L14)

___

### preset

• `Optional` **preset**: `string`

Should a plugin be used to generate default settings?

#### Defined in

[lib/commands/init/init.ts:19](https://github.com/agentender/code-rub/blob/main/packages/code-rub/src/lib/commands/init/init.ts#L19)

___

### skipInstall

• **skipInstall**: `boolean`

Skips installing packages as part of the process. If a package is used for the preset and not installed, passing this *will* cause an error as the package will not be able to be resolved.

#### Defined in

[lib/commands/init/init.ts:24](https://github.com/agentender/code-rub/blob/main/packages/code-rub/src/lib/commands/init/init.ts#L24)
