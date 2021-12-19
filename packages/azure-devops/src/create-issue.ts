import { WebApi } from 'azure-devops-node-api';
import {
    JsonPatchOperation, Operation
} from 'azure-devops-node-api/interfaces/common/VSSInterfaces';

import { AzureDevopsPluginConfig } from './models/config';

export async function createIssue(
  az: WebApi,
  config: AzureDevopsPluginConfig,
  azureDisplayName: string,
  filePath: string
) {
  const { summary, body } = buildFieldValues(config, filePath);
  const workItemApi = await az.getWorkItemTrackingApi();

  const ops: JsonPatchOperation[] = [
    {
      op: Operation.Add,
      path: '/fields/System.Title',
      value: summary,
    },
    {
      op: Operation.Add,
      path: '/fields/System.Description',
      value: body,
    },
    {
      op: Operation.Add,
      path: '/fields/System.AssignedTo',
      value: azureDisplayName,
    },
  ];

  if (config.parentTicket) {
    ops.push({
      op: Operation.Add,
      path: '/relations/-',
      value: {
        rel: 'System.LinkTypes.Hierarchy-Reverse',
        url: `${config.host}/_apis/wit/workItems/${config.parentTicket}`,
        attributes: {
          comment: 'Making a new link for the dependency',
        },
      },
    });
  }

  const workItem = await workItemApi.createWorkItem(
    {},
    ops,
    config.project,
    config.workItemType,
    false,
    true
  );

  console.log('Created work item:', getTicketUrl(config, workItem.id || 0));
}

function getTicketUrl(
  { host, project }: AzureDevopsPluginConfig,
  ticketId: number
) {
  let r = `${host}/${project}/_workitems/edit/${ticketId}`;
  r = r.replace(/\/\//g, '/');
  return r;
}

function buildFieldValues(config: AzureDevopsPluginConfig, filePath: string) {
  const summary = config.titleTemplate.replace(/\{fileName\}/g, filePath);
  const body = config.descriptionTemplate
    ?.replace(/\{fileName\}/g, filePath)
    .split('\n')
    .map((x) => `<div>${x}</div>`)
    .join('\n');
  return { summary, body };
}
