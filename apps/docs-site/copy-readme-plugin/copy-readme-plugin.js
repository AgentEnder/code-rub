const { readFileSync, writeFileSync } = require('fs');
const { readJsonSync } = require('fs-extra');
const { join } = require('path');

function CopyReadmePlugin(context, options) {
  return {
    name: 'copy-readme-plugin',
    async loadContent() {
      copyRootReadme(context);
      const plugins = [
        'packages/jira',
        'packages/azure-devops',
        'packages/filter-files',
      ];
      for (const plugin of plugins) {
        generatePluginMarkdown(plugin, context);
      }
    },
  };
}

function copyRootReadme(context) {
  const readmeContents = readFileSync('README.md');
  writeFileSync(
    `${context.siteDir}/docs/getting-started.md`,
    `---
id: getting-started
title: "Getting Started"
sidebar_label: "Getting Started"
slug: "/"
---
  
  ${readmeContents}
  `
  );
}

function generatePluginMarkdown(path, context) {
  const packageName = readJsonSync(join(path, 'package.json')).name;
  const sanitizedName = packageName.replace(/[\W]+/g, '-').replace(/^-/g, '');
  const segments = packageName.split('/');
  const pluginName = segments[segments.length - 1];
  const readmeContents = readFileSync(join(path, 'README.md'));
  writeFileSync(
    `${context.siteDir}/docs/plugins/${sanitizedName}.md`,
    `---
id: plugin-${sanitizedName}
title: "${packageName}"
sidebar_label: "${pluginName}"
slug: "/plugins/${pluginName}"
---

${readmeContents}
`
  );
}

module.exports = CopyReadmePlugin;
