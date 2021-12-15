import { FileAssignment } from '..';
import { CodeRubPlugin } from '../models/plugin.interface';
import { readFilesToProcess } from './read-files-to-process';

export function generateAssignments(plugins: CodeRubPlugin[] = []) {
  const files = readFilesToProcess(plugins);
  const assignments: FileAssignment[] = files.map((x) => ({
    filePath: x,
    uid: '',
  }));

  return plugins.reduce((a, plugin) => {
    if (plugin.processAssignments) {
      const result = plugin.processAssignments(a);
      if (!(result === null) && !(result === undefined)) {
        return result;
      }
    }
    return a;
  }, assignments);
}
