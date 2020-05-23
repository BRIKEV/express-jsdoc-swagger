const readFile = require('../utils/readFile');

const readFiles = files => {
  const filesInfo = files.map(file => readFile(file));
  return Promise.all(filesInfo);
};

module.exports = readFiles;
