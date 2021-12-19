import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

import { ResolvedConfig } from '../models';

export function readFileMap(config: ResolvedConfig): Record<string, boolean> {
  const loaders = config.plugins.filter((p) => !!p.readFileMap);

  if (loaders.length > 1) {
    throw new Error(
      'More than one read/write plugin may not be specified. Found: ' +
        loaders.map((x) => x.name).toString()
    );
  }

  if (loaders.length == 0) {
    return CSVReader(config);
  }

  const loader = loaders[0];
  return loader.readFileMap?.(config) || {};
}

function CSVReader(c: ResolvedConfig) {
  const path = join(c.storagePath || '.code-rub', 'assignments.csv');
  if (existsSync(path)) {
    const fileContents = readFileSync(path, 'utf-8');
    const lines = fileContents.split('\n');
    lines.splice(0, 1);
    const fileMap = lines.reduce((map, fileHistory) => {
      const [file, seen] = fileHistory.split(',');
      map[file] = seen === 'true';
      return map;
    }, {} as Record<string, boolean>);
    return fileMap;
  }
  return {};
}
