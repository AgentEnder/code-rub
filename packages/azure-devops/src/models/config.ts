export interface AzureDevopsPluginConfig {
  /**
   * Which project should the ticket be associated with?
   */
  project: string;

  /**
   * Should the ticket be a child? Which ticket is its parent?
   */
  parentTicket?: string;

  /**
   * What format should the title be in?
   */
  titleTemplate: string;

  /**
   * What should the description look like?
   */
  descriptionTemplate: string;

  /**
   * What type should the work item be created as?
   * @default Task
   */
  workItemType: string;

  /**
   * Whats your Azure Devops host url?
   * @example https://dev.azure.com/my-org
   */
  host: string;
}
