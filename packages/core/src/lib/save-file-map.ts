import { ensureDirSync, writeFileSync } from 'fs-extra';
import { dirname, join } from 'path';

import { ResolvedConfig } from '../models';

export function saveFileMap(
  fileMap: Record<string, boolean>,
  config: ResolvedConfig
): void {
  const loaders = config.plugins.filter((p) => !!p.saveFileMap);

  if (loaders.length > 1) {
    throw new Error(
      'More than one read/write plugin may not be specified. Found :' +
        loaders.map((x) => x.name).toString()
    );
  }

  if (loaders.length == 0) {
    return CSVWriter(fileMap, config);
  }

  const loader = loaders[0];
  return loader.saveFileMap?.(fileMap, config);
}

function CSVWriter(fileMap: Record<string, boolean>, c: ResolvedConfig) {
  const path = join(c.storagePath || '.code-rub', 'assignments.csv');

  let lines = ['File, Seen'];
  lines = lines.concat(
    Object.entries(fileMap)
      .map(([file, seen]) => `${file},${seen}`)
      .sort()
  );

  ensureDirSync(dirname(path));
  writeFileSync(path, lines.join('\n'));
}
