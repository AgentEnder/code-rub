import { execSync } from 'child_process';
import {
  copySync,
  ensureDirSync,
  existsSync,
  removeSync,
  writeFileSync,
} from 'fs-extra';
import { tmpdir } from 'os';
import { basename, dirname, join, resolve } from 'path';
import { getWorkspacePackages } from '../utils';
import { startCleanVerdaccioInstance } from './local-registry/setup';
import { publishDev } from './publish-dev';

const sandboxDirectory = join(tmpdir(), 'code-rub-sandbox');

export function setup() {
  copySync('.npmrc.local', '.npmrc');
  startCleanVerdaccioInstance();
  publishDev(null, null, true);
}

if (require.main === module) {
  setup();
  if (existsSync(sandboxDirectory)) {
    removeSync(sandboxDirectory);
  }
  ensureDirSync(sandboxDirectory);
  execSync(`git init`, {
    cwd: sandboxDirectory,
    stdio: 'inherit',
  });
  writeFileSync(
    join(sandboxDirectory, 'package.json'),
    JSON.stringify({ name: 'sandbox', dependencies: {} })
  );
  copySync('.npmrc.local', join(sandboxDirectory, '.npmrc'));
  execSync(`yarn add --dev ${getWorkspacePackages().join(' ')}`, {
    cwd: sandboxDirectory,
    stdio: 'inherit',
  });
  console.log('Sandbox created at', resolve(sandboxDirectory));
}
