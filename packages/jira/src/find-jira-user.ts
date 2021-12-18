import type JiraApi from 'jira-client';

export async function findJiraUser(jira: JiraApi, uid: string) {
  const searchResults = await jira.searchUsers({
    query: `${uid}`,
  } as any);

  if (searchResults.length === 0) {
    throw new Error('No Jira user found matching ' + uid);
  }
  if (searchResults.length > 1) {
    throw new Error('Multiple Jira users found matching ' + uid);
  }

  return searchResults[0].accountId;
}
