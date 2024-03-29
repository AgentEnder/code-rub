const copyReadmePlugin = require('./copy-readme-plugin/copy-readme-plugin');

module.exports = {
  title: 'Code Rub',
  tagline: 'Tech debt, paid down.',
  url: 'https://agentender.github.io',
  baseUrl: '/code-rub/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'agentender', // Usually your GitHub org/user name.
  projectName: 'cod-rub', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Code Rub',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: '/',
          activeBasePath: '/',
          label: 'Docs',
          position: 'left',
        },
        // { to: 'blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/agentender/code-rub',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/',
            },
            {
              label: 'API',
              to: '/API/code-rub',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            // {
            //   label: 'Stack Overflow',
            //   href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            // },
            // {
            //   label: 'Discord',
            //   href: 'https://discordapp.com/invite/docusaurus',
            // },
            {
              label: 'Twitter',
              href: 'https://twitter.com/agentender',
            },
          ],
        },
        {
          title: 'More',
          items: [
        //     {
        //       label: 'Blog',
        //       to: 'blog',
        //     },
            {
              label: 'GitHub',
              href: 'https://github.com/agentender/code-rub',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          // Please change this to your repo.
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
    copyReadmePlugin,
    [
      'docusaurus-plugin-typedoc',

      // Plugin / TypeDoc options
      {
        id: 'core-api',
        entryPoints: ['packages/core/src/index.ts'],
        tsconfig: 'packages/core/tsconfig.json',
        out: 'API/@code-rub/core',
        gitRevision: 'main',
        sidebar: {
          categoryLabel: '@code-rub/core',
        },
      },
    ],
    [
      'docusaurus-plugin-typedoc',

      // Plugin / TypeDoc options
      {
        id: 'jira-api',
        entryPoints: [
          'packages/jira/src/plugin.ts',
          'packages/jira/src/models/index.ts',
        ],
        tsconfig: 'packages/jira/tsconfig.json',
        out: 'API/@code-rub/jira',
        gitRevision: 'main',
        sidebar: {
          categoryLabel: '@code-rub/jira',
        },
      },
    ],
    [
      'docusaurus-plugin-typedoc',

      // Plugin / TypeDoc options
      {
        id: 'azure-devops-api',
        entryPoints: [
          'packages/azure-devops/src/models/index.ts',
          'packages/azure-devops/src/plugin.ts',
        ],
        tsconfig: 'packages/azure-devops/tsconfig.json',
        out: 'API/@code-rub/azure-devops',
        gitRevision: 'main',
        sidebar: {
          categoryLabel: '@code-rub/azure-devops',
        },
      },
    ],
    [
      'docusaurus-plugin-typedoc',

      // Plugin / TypeDoc options
      {
        id: 'filter-files-api',
        entryPoints: [
          'packages/filter-files/src/models/index.ts',
          'packages/filter-files/src/lib/filter-files.plugin.ts',
        ],
        tsconfig: 'packages/filter-files/tsconfig.json',
        out: 'API/@code-rub/filter-files',
        gitRevision: 'main',
        sidebar: {
          categoryLabel: '@code-rub/filter-files',
        },
      },
    ],
    [
      'docusaurus-plugin-typedoc',

      // Plugin / TypeDoc options
      {
        id: 'cli-api',
        entryPoints: ['packages/code-rub/src/index.ts'],
        tsconfig: 'packages/code-rub/tsconfig.json',
        out: 'API/code-rub',
        gitRevision: 'main',
        sidebar: {
          categoryLabel: 'code-rub',
        },
      },
    ],
  ],
};
