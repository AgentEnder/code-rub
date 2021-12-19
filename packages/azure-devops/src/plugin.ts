import * as azdev from 'azure-devops-node-api';

import { CodeRubPlugin } from '@code-rub/core';

import { createIssue } from './create-issue';
import { getCredentials } from './get-credentials';
import { AzureDevopsPluginConfig } from './models/config';

// Initialize
let az: azdev.WebApi;

const plugin: CodeRubPlugin<AzureDevopsPluginConfig> = {
  name: '@code-rub/azure-devops',
  setup: async (config) => {
    const { accessToken } = await getCredentials();
    const authHandler = azdev.getPersonalAccessTokenHandler(accessToken);
    az = new azdev.WebApi(config.host, authHandler);
  },
  processAssignments: async (assignments, config) => {
    for (const a of assignments) {
      await createIssue(az, config, a.uid, a.filePath);
    }
  },
  initialConfiguration: {
    plugins: ['@code-rub/azure-devops'],
    pluginConfiguration: {
      '@code-rub/azure-devops': {
        host: '{my-az-url}',
        descriptionTemplate: [
          `Code rubbing is just like glass rubbing, it makes cleaner, shinier and better to look at. \n`,
          `In order for that to happen, every engineer will need to pick up a random file from the solution they are working on, and make sure it follows the best practices and latest technologies, along with making sure it maintains it’s consistency across the entire solution. \n`,
          `There are conditions for code rubbing, which are:`,
          `- It shouldn’t take more than 20 minutes from an engineer’s day.`,
          `- It should target only one single file per day.`,
          `- It shouldn’t include implementing new features or fixing bugs.`,
          `- It should require more code reading than code writing.`,
          `- It shouldn’t require a pairing session.`,
          `- It should be done continuously every single day.`,
          `- It shouldn’t happen to the same file by the same engineer twice unless every other file has been already rubbed`,
          ``,
          `Your file has already been picked, it is {fileName}`,
        ].join('\n'),
        titleTemplate: 'Code rub: {fileName}',
        workItemType: 'Sub-task',
        project: '{my-project}',
      } as AzureDevopsPluginConfig,
    },
  },
};

export = plugin;
