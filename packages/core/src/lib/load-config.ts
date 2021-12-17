import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { basename, join } from 'path';
import { register } from 'ts-node';
import { ProvidedConfig, ResolvedConfig } from '../models/config.interface';
import { CodeRubPlugin } from '../models/plugin.interface';

const DEFAULT_CONFIG_FILES = ['code-rub.config.js', 'code-rub.config.ts'];

export function configFileName() {
  return (
    process.env.CODE_RUB_CONFIG ||
    DEFAULT_CONFIG_FILES.filter((x) => existsSync(x))[0]
  );
}

let rootPath: string;
export function repoRootPath() {
  return rootPath ??= execSync(`git rev-parse --show-toplevel`).toString().trim();
}

export async function loadConfig(
  path = configFileName()
): Promise<ResolvedConfig> {
  module.paths.push(repoRootPath())
  const config: ProvidedConfig = _require(join(rootPath, path));
  config.storagePath ??= '.code-rub';
  config.plugins ??= [];
  config.uids ??= [];
  config.tasksPerDeveloper ??= 1;
  config.plugins = config.plugins.reduce((plugins, next) => {
    const plugin = typeof next === 'string' ? _require(next) : next;
    if (!plugin.name) {
      plugin.name =
        typeof next === 'string'
          ? basename(require.resolve(next))
          : 'UnknownPlugin';
    }
    plugins.push(plugin);
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

export function _require(path: string) {
  const p = require.resolve(path);
  if (p.endsWith('.ts')) {
    registerTsNode();
  }
  return require(p);
}

function registerTsNode() {
  register();
}
