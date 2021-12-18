import { repoRootPath } from '@code-rub/core';
import { exec } from 'child_process';
import { getPackageManagerCommand } from './package-manager';
import ora from 'ora';

export async function installDevDependencies(packages: string[]) {
  console.log('Adding required packages to package.json');
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
