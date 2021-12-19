import { readdir, readFileSync } from 'fs';
import ignore, { Ignore } from 'ignore';
import { join } from 'path';

import { ResolvedConfig } from '../models';
import { Func } from '../models/misc';
import { repoRootPath } from './utils';

export async function readFilesToProcess(configuration: ResolvedConfig): Promise<{
  allFiles: string[];
  filteredFiles: string[];
}> {
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
  await visitNotIgnoredFiles(repoRootPath(), '.', (f) => files.push(f), ignore);
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
): Promise<void> {
  const absolutePath = join(basePath, directory);
  return new Promise((res, rej) =>
    readdir(absolutePath, { withFileTypes: true }, async (err, entries) => {
      if (err) {
        rej(err);
      }
      const promises: Promise<void>[] = [];
      for (const entry of entries) {
        const childPath = join(directory, entry.name);
        if (ignore && ignore.test(childPath).ignored) {
          continue;
        }

        if (entry.isDirectory()) {
          promises.push(
            visitNotIgnoredFiles(basePath, childPath, visitor, ignore)
          );
        } else {
          visitor(childPath);
        }
      }
      await Promise.all(promises);
      res();
    })
  );
}

function getDefaultIgnore(): Ignore {
  return ignore().add(readFileSync('.gitignore', 'utf-8')).add('.git');
}
