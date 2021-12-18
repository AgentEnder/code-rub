import { register } from 'ts-node';
import { repoRootPath } from './path';

export function resolve(path: string) {
  return require.resolve(path, { paths: [repoRootPath()] });
}

export function extendedRequire(path: string) {
  const p = resolve(path);
  if (p.endsWith('.ts')) {
    registerTsNode();
  }
  return require(p);
}

function registerTsNode() {
  register();
}
