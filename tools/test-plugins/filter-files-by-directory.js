module.exports = {
  name: 'FilterFilesPlugin',
  processFileQueue: (a) => {
    return a.filter((x) => {
      return x.includes('packages/jira');
    });
  },
};
