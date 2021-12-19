import { execSync } from 'child_process';
import { copySync, removeSync } from 'fs-extra';

import { e2eRoot } from '../../e2e/utils';
import { startCleanVerdaccioInstance } from './local-registry/setup';
import { publishAll } from './publish-all';

const kill = require('tree-kill');

export function setup() {
  startCleanVerdaccioInstance();
  copySync('.npmrc.local', '.npmrc');
  publishAll('99.99.99', 'local');
}

async function runTest() {
  let selectedProjects = process.argv[2];

  let testNamePattern = '';
  if (process.argv[3] === '-t' || process.argv[3] == '--testNamePattern') {
    testNamePattern = `--testNamePattern "${process.argv[4]}"`;
  }

  if (process.argv[3] === 'affected') {
    const affected = execSync(
      `npx nx print-affected --base=origin/master --select=projects`
    )
      .toString()
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    selectedProjects =
      affected.length === 0
        ? selectedProjects
        : selectedProjects
            .split(',')
            .filter((s) => affected.indexOf(s) > -1)
            .join(',');
  }

  if (process.argv[5] != '--rerun') {
    removeSync('./dist');
    removeSync(e2eRoot);
  }

  try {
    setup();
    if (selectedProjects === '') {
      console.log('No tests to run');
    } else if (selectedProjects) {
      execSync(
        `yarn nx run-many --target=e2e --projects=${selectedProjects} ${testNamePattern}`,
        {
          stdio: [0, 1, 2],
          env: {
            ...process.env,
            NX_TERMINAL_CAPTURE_STDERR: 'true',
            NPM_CONFIG_REGISTRY: 'http://localhost:4872',
            YARN_REGISTRY: 'http://localhost:4872',
          },
        }
      );
    } else {
      execSync(`yarn nx run-many --target=e2e --all`, {
        stdio: [0, 1, 2],
        env: {
          ...process.env,
          NX_TERMINAL_CAPTURE_STDERR: 'true',
          NPM_CONFIG_REGISTRY: 'http://localhost:4872',
          YARN_REGISTRY: 'http://localhost:4872',
        },
      });
    }
    cleanUp(0);
  } catch (e) {
    console.log(e);
    cleanUp(1);
  }
}

function cleanUp(code: number) {
  // try terminate everything first
  try {
    if (!process.env.CI) {
      kill(0);
    }
  } catch (e) {}
  // try killing everything after in case something hasn't terminated
  try {
    if (!process.env.CI) {
      kill(0, 'SIGKILL');
    }
  } catch (e) {}

  process.exit(code);
}

process.on('SIGINT', () => cleanUp(1));

runTest()
  .then(() => {
    console.log('done');
    process.exit(0);
  })
  .catch((e) => {
    console.error('error', e);
    process.exit(1);
  });
