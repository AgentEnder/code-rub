import { ProvidedConfig, repoRootPath } from '@code-rub/core';
import { existsSync, writeFileSync } from 'fs';
import { join } from 'path';
import { prompt } from 'enquirer';
import type * as Prettier from 'prettier';

export interface InitArgs {
  configFile: string;
}

type ConfigPropertyDescription = {
  [key in keyof ProvidedConfig]: {
    description: string;
    defaultValue: string;
  };
};

const DEFAULT_CONFIG: ConfigPropertyDescription = {
  plugins: {
    defaultValue: '[]',
    description:
      'Which code-rub plugins should be used to extend the base functionality.',
  },
  tasksPerDeveloper: {
    defaultValue: '10',
    description: 'How many code-rub tasks should be assigned per developer',
  },
  uids: {
    defaultValue: "['dev@company.com']",
    description: [
      "A list of user id's representing the developers on the team.",
      'This will change based on how the assignments are processed',
      'For example, if using @code-rub/jira, this should be the developers jira username.',
    ].join('\n'),
  },
  pluginConfiguration: {
    defaultValue: '{}',
    description: 'Configuration for the plugins registered above. ',
  },
};

export async function init({ configFile }: InitArgs) {
  const path = join(repoRootPath(), configFile);
  if (existsSync(configFile)) {
    const { response } = await prompt<{ response: boolean }>({
      type: 'confirm',
      name: 'response',
      message: `${configFile} already exists! Reset it to the default config?`,
    });
    if (!response) {
      return Promise.resolve();
    }
  }
  const prettier = await loadPrettier();
  let contents = buildConfigFileContents();

  if (prettier) {
    const config: Prettier.Options =
      (await prettier.resolveConfig(repoRootPath())) || {};
    config.filepath = path;
    contents = prettier.format(contents, config);
  }

  writeFileSync(path, contents);
}

async function loadPrettier(): Promise<typeof Prettier | null> {
  return import('prettier').catch(() => null);
}

function buildConfigFileContents() {
  return [
    'module.exports = {',
    Object.entries(DEFAULT_CONFIG)
      .map(([key, meta]) =>
        [
          '  /**',
          meta.description
            .split('\n')
            .map((line) => '   * ' + line)
            .join('\n'),
          '   */',
          `\t${key}: ${meta.defaultValue},`,
          '',
        ].join('\n')
      )
      .join('\n')
      .trimEnd(),
    '};',
  ]
    .join('\n')
    .trimEnd();
}
