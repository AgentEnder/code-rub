const { extname } = require('path');

module.exports = {
  processAssignments: (a) => {
    return a.filter((x) => {
      return extname(x.filePath) === '.ts'
    });
  },
};
