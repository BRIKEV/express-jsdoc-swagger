const glob = require('glob');
const path = require('path');

const DEFAULT_EXCLUDED_FOLDER = 'node_modules';

const globFilesMatches = (baseDir, filePath, excludedFolder = DEFAULT_EXCLUDED_FOLDER) => (
  new Promise((resolve, reject) => {
    if (!baseDir && !filePath) {
      const error = new Error('baseDir and filePath are required');
      return reject(error);
    }
    return glob(path.resolve(baseDir, filePath), (err, files) => {
      if (err) {
        return reject(err);
      }
      const filterFiles = files.filter(file => !file.includes(excludedFolder));
      return resolve(filterFiles);
    });
  })
);

module.exports = globFilesMatches;
