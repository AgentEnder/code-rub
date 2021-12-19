import JiraApi from 'jira-client';

import { CodeRubPlugin } from '@code-rub/core';

import { createIssue } from './create-issue';
import { findJiraUser } from './find-jira-user';
import { getCredentials } from './get-credentials';
import { JiraPluginConfig } from './models/config';

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
  initialConfiguration: {
    plugins: ['@code-rub/jira'],
    pluginConfiguration: {
      '@code-rub/jira': {
        host: '{my-jira-url}',
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
        summaryTemplate: 'Code rub: {fileName}',
        issueType: 'Sub-task',
        projectKey: '{my-project}',
      } as JiraPluginConfig,
    },
  },
};

export = plugin;
