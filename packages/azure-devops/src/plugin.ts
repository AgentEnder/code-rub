import * as azdev from 'azure-devops-node-api';

import { CodeRubPlugin } from '@code-rub/core';

import { createIssue } from './create-issue';
import { getCredentials } from './get-credentials';
import { AzureDevopsPluginConfig } from './models/config';
import { buildInitialConfiguration } from './build-initial-configuration';

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
  initialConfiguration: () => buildInitialConfiguration(),
};

export = plugin;
