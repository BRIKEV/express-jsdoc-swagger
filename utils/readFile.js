const fs = require('fs');

const readFile = path => (
  new Promise((resolve, reject) => {
    let data = '';
    const readStream = fs.createReadStream(path, 'utf8');
    readStream.on('data', chunk => {
      data += chunk;
    })
      .on('end', () => resolve(data))
      .on('error', error => reject(error));
  })
);

module.exports = readFile;
