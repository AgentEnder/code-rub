import { FileAssignment, ResolvedConfig } from '../models';

export async function generateAssignments(
  prevFileMap: Record<string, boolean>,
  files: string[],
  config: ResolvedConfig
): Promise<{ assignments: FileAssignment[]; unseenFiles: string[] }> {
  let unseenFiles = Object.entries(prevFileMap).reduce((uf, [f, seen]) => {
    if (!seen) {
      uf.push(f);
    }
    return uf;
  }, [] as string[]);

  unseenFiles.push(
    ...files.filter((x) => !Object.keys(prevFileMap).includes(x))
  );
  unseenFiles = unseenFiles.sort(() => Math.random() - 0.5); // shuffle
  let assignments: FileAssignment[] = [];

  let users: string[] = [];
  for (let i = 0; i < config.tasksPerDeveloper; i++) {
    users = users.concat(config.uids);
  }

  if (files.length === 0) {
    console.warn('No files were found to rub!');
    return { assignments, unseenFiles };
  }

  while (users.length) {
    const user = users.pop();
    if (!unseenFiles.length) {
      unseenFiles = files.sort(() => Math.random() - 0.5);
    }
    assignments.push({
      uid: user as string,
      filePath: unseenFiles.pop() as string,
    });
  }

  for (const plugin of config.plugins) {
    if (plugin.processAssignments) {
      const result = await plugin.processAssignments(
        assignments,
        config.pluginConfiguration?.[plugin.name]
      );
      if (!(result === null) && !(result === undefined)) {
        assignments = result;
      }
    }
  }

  return {
    assignments,
    unseenFiles,
  };
}
