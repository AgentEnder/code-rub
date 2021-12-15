import { generateAssignments } from './generate-assignments';
import { loadConfig } from './load-config';
import { readFilesToProcess } from './read-files-to-process';

const config = loadConfig();

generateAssignments(config.plugins);
