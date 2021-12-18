import { repoRootPath } from '@code-rub/core';
import { readJson } from 'fs-extra';
import ora from 'ora';
import { join } from 'path';
import { config } from 'yargs';
import { installDevDependencies } from './lib/add-packages';
import { buildConfigFile } from './lib/build-config-file';

export interface InitArgs {
  configFile: string;
  preset?: string;
  skipInstall: boolean;
}

const FIRST_PARTY_PLUGINS = ['jira', 'azure-devops', 'filter'];

export async function init({ configFile, preset, skipInstall }: InitArgs) {
  if (preset && FIRST_PARTY_PLUGINS.includes(preset)) {
    preset = `@code-rub/${preset}`;
  }
  if (configFile.split('.').length === 1) {
    configFile = configFile + '.js';
  }

  if (!skipInstall) {
    const packageJson = await readJson(join(repoRootPath(), 'package.json'));
    let packages = ['code-rub', '@code-rub/core'];
    if (preset) {
      packages.push(preset);
    }

    packages = packages.filter(
      (x) =>
        !(
          x in (packageJson.devDependencies || {}) ||
          x in (packageJson.dependencies || {})
        )
    );
    if (packages.length) {
      await installDevDependencies(packages);
    }
  }

  const spinner = ora(`Building ${configFile}`);
  return buildConfigFile(configFile, preset)
    .then(() => {
      spinner.succeed();
    })
    .catch((e) => {
      spinner.fail();
      throw e;
    });
}
