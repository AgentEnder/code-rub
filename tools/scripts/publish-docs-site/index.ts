import { joinPathFragments } from '@nrwl/devkit';

import { execSync } from 'child_process';

if (require.main === module) {
  const path = joinPathFragments(__dirname, '../../../dist/apps/docs-site');
  execSync('git init ', { cwd: path, stdio: 'inherit' });
  execSync('git checkout -b "gh-pages"', { cwd: path, stdio: 'inherit' });
  execSync('git add . && git commit -m "chore: deploy docs site"', {
    cwd: path,
    stdio: 'inherit',
  });
  execSync(
    `git remote add origin https://github-actions:${process.env.GITHUB_TOKEN}@github.com/agentender/code-rub`,
    { cwd: path, stdio: 'inherit' }
  );
  execSync('git push -f --set-upstream origin gh-pages', {
    cwd: path,
    stdio: 'inherit',
  });
}
