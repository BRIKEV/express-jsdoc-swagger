const readFile = require('./utils/readFile');

const readFiles = files => {
  if (!files || !Array.isArray(files)) return Promise.resolve([]);
  const filesInfo = files.map(file => readFile(file));
  return Promise.all(filesInfo);
};

module.exports = readFiles;
