import { exec } from 'child_process';
import { prompt } from 'enquirer';
import ora from 'ora';

import { repoRootPath } from '@code-rub/core';

import { getPackageManagerCommand } from './package-manager';

export async function installDevDependencies(packages: string[]) {
  console.log(
    [
      'This will install the following packages: ',
      ...packages.map((x) => '\t- ' + x),
    ].join('\n')
  );
  const { c } = await prompt<{ c: boolean }>({
    name: 'c',
    type: 'confirm',
    message: 'Install Packages?',
  });
  if (!c) return;
  const cmd = `${getPackageManagerCommand().addDev} ${packages.join(' ')}`;
  const spinner = ora(cmd).start();
  return new Promise<void>((res, rej) =>
    exec(
      cmd,
      {
        cwd: repoRootPath(),
      },
      (error, _, stderr) => {
        if (error) {
          spinner.fail();
          console.error(stderr);
          rej(error);
        } else {
          spinner.succeed();
          res();
        }
      }
    )
  );
}
