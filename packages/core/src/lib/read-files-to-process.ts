import ignore, { Ignore } from 'ignore';

import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { ResolvedConfig } from '../models';
import { Func } from '../models/misc';
import { repoRootPath } from './utils';

export function readFilesToProcess(configuration: ResolvedConfig): {
  allFiles: string[];
  filteredFiles: string[];
} {
  const ignore = configuration.plugins.reduce(
    (ig, plugin) =>
      plugin.processIgnore
        ? plugin.processIgnore(
            ig,
            configuration.pluginConfiguration?.[plugin.name]
          )
        : ig,
    getDefaultIgnore()
  );

  const files: string[] = [];
  visitNotIgnoredFiles(repoRootPath(), '.', (f) => files.push(f), ignore);
  return {
    allFiles: files,
    filteredFiles: configuration.plugins.reduce(
      (f, plugin) =>
        plugin.processFileQueue?.(
          f,
          configuration.pluginConfiguration?.[plugin.name]
        ) || f,
      files
    ),
  };
}

function visitNotIgnoredFiles(
  basePath: string,
  directory: string,
  visitor: Func<[string], void>,
  ignore?: Ignore
): void {
  const absolutePath = join(basePath, directory);
  const entries = readdirSync(absolutePath, { withFileTypes: true });
  for (const entry of entries) {
    const childPath = join(directory, entry.name);
    if (ignore && ignore.test(childPath).ignored) {
      continue;
    }

    if (entry.isDirectory()) {
      visitNotIgnoredFiles(basePath, childPath, visitor, ignore);
    } else {
      visitor(childPath);
    }
  }
}

function getDefaultIgnore(): Ignore {
  return ignore().add(readFileSync('.gitignore', 'utf-8')).add('.git');
}
