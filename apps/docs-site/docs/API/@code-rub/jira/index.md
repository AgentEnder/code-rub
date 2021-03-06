---
id: "index"
title: "@code-rub/jira"
slug: "/API/@code-rub/jira/"
sidebar_label: "Readme"
sidebar_position: 0
custom_edit_url: null
---

# @code-rub/jira

This plugin adds support for creating issues on jira.

To get started, run `npx code-rub init --preset jira` and update any placeholders inside `code-rub.config.js`.

An example configuration is listed below for completeness:

```javascript
const config = {
  plugins: ['@code-rub/jira'],
  pluginConfiguration: {
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
  },
};

module.exports = config;
```
