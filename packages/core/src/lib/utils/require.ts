import { register } from 'ts-node';
import { repoRootPath } from './path';

module.paths.push(repoRootPath());

export function extendedRequire(path: string) {
  const p = require.resolve(path);
  if (p.endsWith('.ts')) {
    registerTsNode();
  }
  return require(p);
}

function registerTsNode() {
  register();
}
