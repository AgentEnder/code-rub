import JiraApi = require('jira-client');
import { JiraPluginConfig } from './models/config';

export async function createIssue(
  jira: JiraApi,
  config: JiraPluginConfig,
  jiraUserId: JiraApi.UserObject,
  filePath: string
) {
  const summary = config.summaryTemplate.replace(/\{fileName\}/g, filePath);
  const body: Record<string, any> = {
    fields: {
      project: {
        key: config.projectKey,
      },
      summary,
      description: config.descriptionTemplate?.replace(
        /\{fileName\}/g,
        filePath
      ),
      issuetype: {
        name: config.issueType,
      },
      assignee: {
        id: jiraUserId,
      },
      ...config.extraFields
    },
  };
  if (config.parentIssue) {
    body.fields.parent = {
      key: config.parentIssue,
    };
  }
  const result = await jira.addNewIssue(body);
  if (result.errorMessages?.length || result.errors) {
    console.warn(`Failed to create Jira Issue: ${summary}`);
    result.errorMessages ??= [];
    result.errorMessages.forEach((msg: string) => {
      console.warn(msg);
    });
    Object.entries(result.errors).forEach(
      ([section, msg]: [string, unknown]) => {
        console.warn(`${section} - ${msg}`);
      }
    );
  } else {
    console.log(
      `Created code-rub ${config.issueType}`,
      `https://${config.host}/browse/${result.key}`
    );
  }
}
