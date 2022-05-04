import { register } from 'ts-node';

import { repoRootPath } from './path';

export function resolve(path: string) {
  return require.resolve(path, { paths: [repoRootPath()] });
}

export function extendedRequire<T>(path: string) {
  const p = resolve(path);
  if (p.endsWith('.ts')) {
    registerTsNode();
  }
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require(p) as T;
}

function registerTsNode() {
  register();
}
