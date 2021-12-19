import plugin from './filter-files.plugin';

describe('FilterFilesPlugin', () => {
  it('should remove banned files', () => {
    const files = ['banned-file.ts', 'some-directory/banned-file.ts', 'not-banned-file.ts']
    expect(plugin.processFileQueue(files, {
      bannedFileNames: ['banned-file.ts']
    })).toEqual(['not-banned-file.ts']);
  });
  
  it('should only return specified extensions', () => {
    const files = ['file.ts', 'file.js', 'banned-file.md']
    expect(plugin.processFileQueue(files, {
      allowedFileExtensions: ['.ts', '.js']
    })).toEqual(['file.ts', 'file.js']);
  });
});
