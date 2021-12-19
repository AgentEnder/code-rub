---
id: "models.AzureDevopsPluginConfig"
title: "Interface: AzureDevopsPluginConfig"
sidebar_label: "AzureDevopsPluginConfig"
custom_edit_url: null
---

[models](../modules/models).AzureDevopsPluginConfig

## Properties

### descriptionTemplate

• **descriptionTemplate**: `string`

What should the description look like?

#### Defined in

[models/config.ts:20](https://github.com/agentender/code-rub/blob/3647cc9/packages/azure-devops/src/models/config.ts#L20)

___

### host

• **host**: `string`

Whats your Azure Devops host url?

**`example`** https://dev.azure.com/my-org

#### Defined in

[models/config.ts:32](https://github.com/agentender/code-rub/blob/3647cc9/packages/azure-devops/src/models/config.ts#L32)

___

### parentTicket

• `Optional` **parentTicket**: `string`

Should the ticket be a child? Which ticket is its parent?

#### Defined in

[models/config.ts:10](https://github.com/agentender/code-rub/blob/3647cc9/packages/azure-devops/src/models/config.ts#L10)

___

### project

• **project**: `string`

Which project should the ticket be associated with?

#### Defined in

[models/config.ts:5](https://github.com/agentender/code-rub/blob/3647cc9/packages/azure-devops/src/models/config.ts#L5)

___

### titleTemplate

• **titleTemplate**: `string`

What format should the title be in?

#### Defined in

[models/config.ts:15](https://github.com/agentender/code-rub/blob/3647cc9/packages/azure-devops/src/models/config.ts#L15)

___

### workItemType

• **workItemType**: `string`

What type should the work item be created as?

**`default`** Task

#### Defined in

[models/config.ts:26](https://github.com/agentender/code-rub/blob/3647cc9/packages/azure-devops/src/models/config.ts#L26)
