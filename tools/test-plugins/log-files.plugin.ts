module.exports = {
  processAssignments: (a: any[]) => {
    a.forEach((x) => {
      console.log(x.filePath);
    });
  },
};
