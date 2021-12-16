import { execSync } from 'child_process';
import * as parser from 'yargs-parser';
import { prompt } from 'enquirer';

export async function getCredentials(): Promise<{
  username: string;
  password: string;
}> {
  const argv = parser(process.argv.slice(2));

  const username =
    argv.username ||
    argv.jiraUsername ||
    process.env.JIRA_USERNAME ||
    getGitConfig('jira.username');
  const password =
    argv.password ||
    argv.jiraPassword ||
    process.env.JIRA_PASSWORD ||
    getGitConfig('jira.password');

  if (!username || !password) {
    return prompt([
      {
        type: 'input',
        name: 'username',
        message: 'Jira Username: ',
        required: true,
        initial: username,
      },
      {
        type: 'input',
        name: 'password',
        message: 'Jira Password: ',
        required: true,
        initial: password,
      },
    ]);
  }

  return { username, password };
}

function getGitConfig(section: string) {
  try {
    return execSync(`git config ${section}`).toString().trim();
  } catch {
    return null;
  }
}
