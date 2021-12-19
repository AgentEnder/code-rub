import { execSync } from 'child_process';
import { prompt } from 'enquirer';
import parser from 'yargs-parser';

export async function getCredentials(): Promise<{
  accessToken: string
}> {
  const argv = parser(process.argv.slice(2));

  const PAT =
    argv.accessToken ||
    argv.azToken ||
    process.env.AZURE_PERSONAL_ACCESS_TOKEN ||
    getGitConfig('azure.personal_access_token');
  
  if (!PAT) {
    return prompt([
      {
        type: 'input',
        name: 'PAT',
        message: 'Azure Personal Access Token: ',
        required: true,
        initial: PAT,
      }
    ]);
  }

  return { accessToken: PAT };
}

function getGitConfig(section: string) {
  try {
    return execSync(`git config ${section}`).toString().trim();
  } catch {
    return null;
  }
}
