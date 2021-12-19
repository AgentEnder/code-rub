module.exports = {
  branches: ['main', { name: 'dev', prerelease: true }],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'angular',
        releaseRules: [
          { type: 'docs', release: false },
          { type: 'test', release: false },
          { scope: 'ci', release: false },
          { scope: 'repo', release: false },
          { type: 'release', release: false },
        ],
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        presetConfig: {
          types: [
            { type: 'feat', hidden: false },
            { type: 'fix', hidden: false },
            { type: 'chore', hidden: true },
            { type: 'docs', hidden: true },
            { type: 'style', hidden: true },
            { type: 'refactor', hidden: true },
            { type: 'test', hidden: true },
            { type: 'release', hidden: true },
            { scope: 'repo', hidden: true },
          ],
        },
      },
    ],
    '@semantic-release/changelog',
    [
      '@semantic-release/exec',
      {
        prepareCmd:
          'npx ts-node tools/scripts/patch-package-versions ${nextRelease.version}',
        publishCmd: [
          'npx ts-node tools/scripts/publish-all ${nextRelease.version} ${nextRelease.channel}',
          'nx deploy docs-site',
        ].join(' && '),
        successCmd: 'nx deploy docs-site',
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: [
          'CHANGELOG.md',
          'package.json',
          'packages/*/package.json',
          'apps/docs-site/**/*.md',
        ],
        message:
          "release: <%= nextRelease.version %> [skip ci]\n\n<%= nextRelease.notes %> \n\n<%= new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }) %>",
      },
    ],
    [
      '@semantic-release/github',
      {
        failComment: false,
        releasedLabels: false,
        addReleases: 'top',
      },
    ],
  ],
};
