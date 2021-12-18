import { installDevDependencies } from './lib/add-packages';
import { buildConfigFile } from './lib/build-config-file';

export interface InitArgs {
  configFile: string;
  preset?: string;
}

const FIRST_PARTY_PLUGINS = ['jira', 'azure-devops', 'filter'];

export async function init({ configFile, preset }: InitArgs) {
  const packages = ['code-rub', '@code-rub/core'];
  if (preset) {
    if (FIRST_PARTY_PLUGINS.includes(preset)) {
      preset = `@code-rub/${preset}`;
    }
    packages.push(preset);
  }
  await installDevDependencies(packages);
  buildConfigFile(configFile);
}
