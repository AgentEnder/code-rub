export interface JiraPluginConfig {
  projectKey: string;
  parentIssue: string;
  summaryTemplate: string;
  descriptionTemplate: string;
  issueType: string;
  host: string;
  extraFields: {
    [key: string]: string
  }
}
