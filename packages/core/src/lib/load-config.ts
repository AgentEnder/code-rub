import { join } from 'path';

import { ProvidedConfig, ResolvedConfig } from '../models/config.interface';
import { CodeRubPlugin } from '../models/plugin.interface';
import {
  configFileName,
  extendedRequire,
  repoRootPath,
  resolvePlugin,
} from './utils';

export async function loadConfig(
  path = configFileName()
): Promise<ResolvedConfig> {
  const config: ProvidedConfig = extendedRequire(join(repoRootPath(), path));
  config.storagePath ??= '.code-rub';
  config.plugins ??= [];
  config.uids ??= [];
  config.tasksPerDeveloper ??= 1;
  config.plugins = config.plugins.reduce((plugins, next) => {
    plugins.push(resolvePlugin(next));
    return plugins;
  }, [] as CodeRubPlugin<unknown>[]);

  const resolved = config as ResolvedConfig;

  for (const plugin of resolved.plugins) {
    if (plugin.setup) {
      await plugin.setup(config.pluginConfiguration?.[plugin.name]);
    }
  }

  return config as ResolvedConfig;
}
