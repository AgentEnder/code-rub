import { basename } from 'path';

import { CodeRubPlugin } from '../../models';
import { extendedRequire, resolve } from './require';

export function resolvePlugin<T = unknown>(
  p: CodeRubPlugin<T> | string
): CodeRubPlugin<T> {
  const plugin = typeof p === 'string' ? extendedRequire<CodeRubPlugin<unknown>>(p) : p;
  if (!plugin.name) {
    plugin.name =
      typeof p === 'string' ? basename(resolve(p)) : 'UnknownPlugin';
  }
  return plugin;
}
