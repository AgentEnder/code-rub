import {
  CodeRubPlugin,
  deepClone,
  ProvidedConfig,
  repoRootPath,
  resolvePlugin,
} from '@code-rub/core';
import { existsSync, writeFileSync } from 'fs';
import { join } from 'path';
import { prompt } from 'enquirer';
import type * as Prettier from 'prettier';

type ConfigFileDescription = {
  [key in keyof ProvidedConfig]: ConfigPropertyDescription;
};
type ConfigPropertyDescription = {
  description?: string;
  defaultValue: string;
};

const DEFAULT_CONFIG: ConfigFileDescription = {
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

export async function buildConfigFile(configFile: string, preset?: string) {
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

  let c = DEFAULT_CONFIG;

  if (preset) {
    const plugin = resolvePlugin(preset);
    c = await updateDefaultConfiguration(plugin);
  }

  const prettier = await loadPrettier();
  let contents = buildConfigFileContents(c);

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

function buildConfigFileContents(c: ConfigFileDescription) {
  return [
    'module.exports = {',
    Object.entries(c)
      .map(([key, meta]) =>
        ([] as string[])
          .concat(
            meta.description
              ? [
                  '  /**',
                  meta.description
                    .split('\n')
                    .map((line) => '   * ' + line)
                    .join('\n'),
                  '   */',
                ]
              : [],
            `\t${key}: ${meta.defaultValue},`,
            ''
          )
          .join('\n')
      )
      .join('\n')
      .trimEnd(),
    '};',
  ]
    .join('\n')
    .trimEnd();
}

async function updateDefaultConfiguration({
  initialConfiguration,
}: CodeRubPlugin<unknown>): Promise<ConfigFileDescription> {
  if (!initialConfiguration) {
    return DEFAULT_CONFIG;
  }
  if (typeof initialConfiguration === 'function') {
    initialConfiguration = await initialConfiguration();
  } else {
    initialConfiguration = await initialConfiguration;
  }

  const c = deepClone<typeof DEFAULT_CONFIG>(DEFAULT_CONFIG);
  Object.entries(initialConfiguration).forEach((([key, value]: [
    keyof ProvidedConfig,
    unknown
  ]) => {
    const res = {
      defaultValue: JSON.stringify(value),
    } as ConfigPropertyDescription;
    c[key] = res;
  }) as any);
  return c;
}
