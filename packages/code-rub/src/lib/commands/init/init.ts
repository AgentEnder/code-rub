import { readJson } from 'fs-extra';
import ora from 'ora';
import { join } from 'path';

import { repoRootPath } from '@code-rub/core';

import { installDevDependencies } from './lib/add-packages';
import { buildConfigFile } from './lib/build-config-file';

export interface InitArgs {
  /**
   * What should the new configuration file be named?
   */
  configFile: string;

  /**
   * Should a plugin be used to generate default settings?
   */
  preset?: string;

  /**
   * Skips installing packages as part of the process. If a package is used for the preset and not installed, passing this *will* cause an error as the package will not be able to be resolved.
   */
  skipInstall: boolean;
}

const FIRST_PARTY_PLUGINS = ['jira', 'azure-devops', 'filter'];

/**
 * Initialize a new configuration file for code rub, setting up packages if needed
 * @param Arguments see {@link InitArgs}
 */
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
