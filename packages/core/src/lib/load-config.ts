import { register } from 'ts-node';
import { RawConfig, ResolvedConfig } from '../models/config.interface';
import { CodeRubPlugin } from '../models/plugin.interface';

export function loadConfig(path = 'code-rub.config.js'): ResolvedConfig {
  const config: RawConfig = _require(path);
  config.plugins = config.plugins.reduce((plugins, next) => {
    plugins.push(typeof next === 'string' ? _require(next) : next);
    return plugins;
  }, [] as CodeRubPlugin[]);
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
