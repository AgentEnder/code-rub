import { join } from 'path';

import { ProvidedConfig, ResolvedConfig } from '../models/config.interface';
import { Awaitable, CodeRubPlugin } from '../models/plugin.interface';
import {
  configFileName,
  extendedRequire,
  repoRootPath,
  resolvePlugin,
} from './utils';

const configMap: Record<string, ResolvedConfig> = {};
export async function loadConfig(
  path = configFileName()
): Promise<ResolvedConfig> {
  return (configMap[path] ??= await _loadConfig(path));
}

async function _loadConfig(path: string): Promise<ResolvedConfig> {
  const config = await extendedRequire<Awaitable<ProvidedConfig>>(
    join(repoRootPath(), path)
  );
  config.storagePath ??= '.code-rub';
  config.plugins ??= [];
  config.uids ??= [];
  config.tasksPerDeveloper ??= 1;
  config.plugins = config.plugins.reduce((plugins, next) => {
    plugins.push(resolvePlugin(next));
    return plugins;
  }, [] as CodeRubPlugin<unknown>[]);

  return config as ResolvedConfig;
}
