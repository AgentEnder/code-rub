import * as JiraApi from 'jira-client';

import { CodeRubPlugin } from '@code-rub/core';
import { getCredentials } from './get-credentials';
import { JiraPluginConfig } from './config';
import { findJiraUser } from './find-jira-user';
import { createIssue } from './create-issue';

// Initialize
let jira: JiraApi;

const plugin: CodeRubPlugin<JiraPluginConfig> = {
  name: '@code-rub/jira',
  setup: async (config) => {
    const credentials = await getCredentials();
    jira = new JiraApi({
      protocol: 'https',
      host: config.host,
      apiVersion: '2',
      strictSSL: true,
      ...credentials,
    });
  },
  processAssignments: async (assignments, config) => {
    for (const a of assignments) {
      const user = await findJiraUser(jira, a.uid);
      await createIssue(jira, config, user, a.filePath);
    }
  },
};

export = plugin;
