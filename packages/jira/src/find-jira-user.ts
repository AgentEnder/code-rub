import type JiraApi from 'jira-client';

const uidCache: Record<string, JiraApi.UserObject> = {};
export async function findJiraUser(jira: JiraApi, uid: string) {
  uidCache[uid] ??= searchForJiraUser(jira, uid);
  return uidCache[uid];
}

async function searchForJiraUser(
  jira: JiraApi,
  uid: string
): Promise<JiraApi.UserObject> {
  const searchResults = await jira.searchUsers({
    username: uid,
  } as any);

  if (searchResults.length === 0) {
    throw new Error('No Jira user found matching ' + uid);
  }
  if (searchResults.length > 1) {
    throw new Error('Multiple Jira users found matching ' + uid);
  }

  return searchResults[0];
}
