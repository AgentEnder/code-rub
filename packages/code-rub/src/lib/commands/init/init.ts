import { repoRootPath } from '@code-rub/core';
import { readJson } from 'fs-extra';
import { join } from 'path';
import { installDevDependencies } from './lib/add-packages';
import { buildConfigFile } from './lib/build-config-file';

export interface InitArgs {
  configFile: string;
  preset?: string;
}

const FIRST_PARTY_PLUGINS = ['jira', 'azure-devops', 'filter'];

export async function init({ configFile, preset }: InitArgs) {
  const packageJson = await readJson(join(repoRootPath(), 'package.json'));
  let packages = ['code-rub', '@code-rub/core'];
  if (preset) {
    if (FIRST_PARTY_PLUGINS.includes(preset)) {
      preset = `@code-rub/${preset}`;
    }
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
  buildConfigFile(configFile, preset);
}
