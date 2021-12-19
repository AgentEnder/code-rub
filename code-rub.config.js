const config = {
  plugins: [
    './tools/test-plugins/log-files-length.plugin.js',
    // '@code-rub/jira',
    // '@code-rub/azure-devops',
    '@code-rub/filter-files',
    './tools/test-plugins/log-files-length.plugin.js',
    {
      processAssignments: (assignments) => {
        assignments.forEach((a) => console.log(`${a.uid} -> ${a.filePath}`));
      },
    },
  ],
  uids: ['craigorycoppola@gmail.com'],
  tasksPerDeveloper: 4,
  pluginConfiguration: {
    '@code-rub/filter-files': {
      allowedFileExtensions: ['.ts', '.js'],
      bannedFileNames: [
        'jest.config.js',
        'code-rub.config.js',
        'jest.preset.js',
      ],
    },
    '@code-rub/jira': {
      host: 'craigory-test-instance.atlassian.net',
      summaryTemplate: 'Code rub: {fileName}',
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
      projectKey: 'TES',
      issueType: 'Sub-task',
      parentIssue: 'TES-12',
    },
    '@code-rub/azure-devops': {
      host: 'https://dev.azure.com/AgentEnder',
      titleTemplate: 'Code rub: {fileName}',
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
      project: 'Test-Code-Rub-Project',
      workItemType: 'Task',
      parentTicket: '176',
    },
  },
};

module.exports = config;
