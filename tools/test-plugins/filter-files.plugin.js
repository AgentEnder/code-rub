const { extname, basename } = require('path');

const BANNED_FILE_NAMES = [
  'jest.config.js',
  'jest.preset.js',
  'code-rub.config.js',
  'find-jira-user.ts',
];

module.exports = {
  name: 'FilterFilesPlugin',
  processFileQueue: (a) => {
    return a.filter((x) => {
      return (
        false &&
        !BANNED_FILE_NAMES.includes(basename(x)) &&
        (extname(x) === '.ts' || extname(x) === '.js')
      );
    });
  },
};
