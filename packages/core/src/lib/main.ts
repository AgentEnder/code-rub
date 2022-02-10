import { Observer } from 'rxjs';
import { StatusUpdate } from '../models/status-update.interface';
import {
  generateAssignments,
  processAssignments,
} from './generate-assignments';
import { loadConfig } from './load-config';
import { readFileMap } from './read-file-map';
import { readFilesToProcess } from './read-files-to-process';
import { saveFileMap } from './save-file-map';

export async function worker(updateObserver?: Observer<StatusUpdate>) {
  try {
    updateObserver?.next?.({
      message: 'Loading config',
      complete: false,
    });
    const config = await loadConfig();
    updateObserver?.next?.({
      message: 'Loaded config',
      complete: true,
    });

    updateObserver?.next({
      message: 'Setting up plugins',
      complete: false,
      messageOnly: true
    });
    for (const plugin of config.plugins) {
      if (plugin.setup) {
        updateObserver?.next({
          message: `Setting up plugin ${plugin.name}`,
          complete: false,
          messageOnly: true
        });
        await plugin.setup(config.pluginConfiguration?.[plugin.name]);
      }
    }
    updateObserver?.next({
      message: 'Set up plugins',
      complete: true,
    });

    updateObserver?.next?.({
      message: 'Loading file map',
      complete: false,
    });
    const fileMap = readFileMap(config);
    updateObserver?.next({
      message: 'Loaded file map',
      complete: true,
    });

    updateObserver?.next({
      message: 'Processing file map',
      complete: false,
    });
    const { filteredFiles } = await readFilesToProcess(config, updateObserver);

    const filteredFileMap = filteredFiles.reduce((fm, file) => {
      fm[file] = fileMap[file] ?? false;
      return fm;
    }, {} as Record<string, boolean>);

    updateObserver?.next({
      message: 'Processed file map',
      complete: true,
    });

    updateObserver?.next({
      message: 'Generating assignments',
      complete: false,
    });
    const { assignments, unseenFiles } = await generateAssignments(
      filteredFileMap,
      filteredFiles,
      config
    );
    updateObserver?.next({
      message: 'Generated assignments',
      complete: true,
    });

    updateObserver?.next({
      message: 'Processing assignments',
      complete: false,
    });
    await processAssignments(assignments, config, updateObserver);
    updateObserver?.next({
      message: 'Processed assignments',
      complete: true,
    });

    updateObserver?.next({
      message: 'Saving updated filemap',
      complete: false,
    });
    for (const assignment of assignments) {
      fileMap[assignment.filePath] = true;
    }
    for (const file of unseenFiles) {
      fileMap[file] = false;
    }

    saveFileMap(fileMap, config);
    updateObserver?.next({
      message: 'Saved updated filemap',
      complete: true,
    });
  } catch (e: any) {
    updateObserver?.error(e);
    throw e;
  }
}

async function main() {
  return worker().catch(process.exit(1));
}

if (require.main === module) {
  main();
}
