import { execSync } from 'child_process';
import { existsSync } from 'fs';

const DEFAULT_CONFIG_FILES = ['code-rub.config.js', 'code-rub.config.ts'];

export function configFileName() {
  return (
    process.env.CODE_RUB_CONFIG ||
    DEFAULT_CONFIG_FILES.filter((x) => existsSync(x))[0]
  );
}

let rootPath: string;
export function repoRootPath() {
  return (rootPath ??= execSync(`git rev-parse --show-toplevel`)
    .toString()
    .trim());
}
