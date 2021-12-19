import { Minimatch } from 'minimatch';
import { basename, extname } from 'path';

import { CodeRubPlugin } from '@code-rub/core';

import { FilterFilesConfig } from '../models';

const plugin: CodeRubPlugin<FilterFilesConfig> = {
  name: '@code-rub/filter-files',
  processFileQueue: (files, config) => {
    const matchers =
      config.bannedGlobPatterns?.map((x) => new Minimatch(x)) ?? [];
    config.bannedFileNames ??= [];
    return files.filter(
      (x) =>
        (!config.allowedFileExtensions ||
          config.allowedFileExtensions.some((ext) => extname(x) === ext)) &&
        !matchers.some((matcher) => matcher.match(x)) &&
        !config.bannedFileNames.some((fn) => fn === basename(x))
    );
  },
};

export = plugin;
