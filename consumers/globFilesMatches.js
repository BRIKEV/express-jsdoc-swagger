const glob = require('glob');
const path = require('path');

const globFilesMatches = (baseDir, filePath) => new Promise((resolve, reject) => {
  glob(path.resolve(baseDir, filePath), (err, files) => {
    if (err) {
      return reject(err);
    }
    const filterFiles = files.filter(file => !file.includes('node_modules'));
    return resolve(filterFiles);
  });
});

module.exports = globFilesMatches;
