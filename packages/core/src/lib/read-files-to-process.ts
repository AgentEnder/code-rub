import ignore, { Ignore } from 'ignore';

import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { Func } from '../models/misc';
import { CodeRubPlugin } from '../models/plugin.interface';

export function readFilesToProcess(plugins: CodeRubPlugin[] = []): string[] {
  const ignore = plugins.reduce(
    (ig, plugin) =>
      plugin.processIgnoredFiles ? plugin.processIgnoredFiles(ig) : ig,
    getDefaultIgnore()
  );

  const files: string[] = [];
  visitNotIgnoredFiles('.', (f) => files.push(f), ignore);
  return files;
}

function visitNotIgnoredFiles(
  directory: string,
  visitor: Func<[string], void>,
  ignore?: Ignore
): void {
  const entries = readdirSync(directory, { withFileTypes: true });
  for (const entry of entries) {
    const childPath = join(directory, entry.name);
    if (ignore && ignore.test(childPath).ignored) {
      continue;
    }

    if (entry.isDirectory()) {
      visitNotIgnoredFiles(childPath, visitor, ignore);
    } else {
      visitor(childPath);
    }
  }
}

function getDefaultIgnore(): Ignore {
  return ignore().add(readFileSync('.gitignore', 'utf-8')).add('.git');
}
