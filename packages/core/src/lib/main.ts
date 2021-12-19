import { generateAssignments } from './generate-assignments';
import { loadConfig } from './load-config';
import { readFileMap } from './read-file-map';
import { readFilesToProcess } from './read-files-to-process';
import { saveFileMap } from './save-file-map';

async function main() {
  const config = await loadConfig();
  const fileMap = readFileMap(config);
  const { filteredFiles } = await readFilesToProcess(config);

  const filteredFileMap = filteredFiles.reduce((fm, file) => {
    fm[file] = fileMap[file] ?? false;
    return fm;
  }, {} as Record<string, boolean>);

  const { assignments, unseenFiles } = await generateAssignments(
    filteredFileMap,
    filteredFiles,
    config
  );

  for (const assignment of assignments) {
    fileMap[assignment.filePath] = true;
  }
  for (const file of unseenFiles) {
    fileMap[file] = false;
  }

  saveFileMap(fileMap, config);
}

main();
