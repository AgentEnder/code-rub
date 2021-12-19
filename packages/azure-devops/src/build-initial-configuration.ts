import { ProvidedConfig } from '@code-rub/core';

import { prompt } from 'enquirer';
import parser from 'yargs-parser';

import { AzureDevopsPluginConfig } from './models';

const pluginConfig: AzureDevopsPluginConfig = {
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
};

const staticInitialConfiguration: ProvidedConfig = {
  plugins: ['@code-rub/azure-devops'],
  pluginConfiguration: {
    '@code-rub/azure-devops': pluginConfig,
  },
};

export async function buildInitialConfiguration(): Promise<ProvidedConfig> {
  const argv = parser(process.argv.slice(2));

  let host: string = argv.azureUrl || argv.host;
  
  if (!host) {
    ({ host } = await prompt<{ host: string }>({
      name: 'host',
      message: [
        'What is your AzureDevOps host url?',
        'It probably looks something like one of the two',
        '\t- https://my-organization.visual-studio.com',
        '\t- https://dev.azure.com/my-organization',
      ].join('\n'),
      type: 'input',
    }));
  }
  pluginConfig.host = host;
  
  let project: string = argv.azureProject || argv.project;

  if (!project) {
    ({ project } = await prompt<{ project: string }>({
      name: 'project',
      message: 
        'What project board should the tickets be added to?',
      type: 'input',
    }));
  }
  pluginConfig.project = project;
  
  let parentTicket: string = argv.parent || argv.parentTicket || argv.parentIssue;

  if (!parentTicket) {
    ({ parentTicket } = await prompt<{ parentTicket: string }>({
      name: 'parentTicket',
      message: 
        'What ticket should be the parent of the generated tickets?',
      type: 'input',
      required: false
    }));
  }
  pluginConfig.parentTicket = parentTicket;

  return staticInitialConfiguration;
}
