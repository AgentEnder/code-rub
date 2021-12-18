import { basename } from 'path';

import { CodeRubPlugin } from '../../models';
import { extendedRequire, resolve } from './require';

export function resolvePlugin<T = unknown>(
  p: CodeRubPlugin<T> | string
): CodeRubPlugin<T> {
  const plugin = typeof p === 'string' ? extendedRequire(p) : p;
  if (!plugin.name) {
    plugin.name =
      typeof p === 'string' ? basename(resolve(p)) : 'UnknownPlugin';
  }
  return plugin;
}
