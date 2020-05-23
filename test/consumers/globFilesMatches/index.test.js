const globFilesMatches = require('../../../consumers/globFilesMatches');

describe('glob Files matches method', () => {
  it('should return error array when required param is not send', done => {
    globFilesMatches()
      .catch(error => {
        expect(error.message).toEqual('baseDir and filePath are required');
        done();
      });
  });

  it('should return example.txt and excluded/example.txt file', done => {
    const baseDir = __dirname;
    const filePath = './**/**.txt';
    globFilesMatches(baseDir, filePath)
      .then(files => {
        const [exampleFile, excludedFile] = files;
        expect(exampleFile.includes('example.txt')).toBe(true);
        expect(excludedFile.includes('excluded/example.txt')).toBe(true);
        expect(files).toHaveLength(2);
        done();
      });
  });

  it('should return only example.txt file when we add exclude condition', done => {
    const baseDir = __dirname;
    const filePath = './**/**.txt';
    const excludedFolder = 'excluded';
    globFilesMatches(baseDir, filePath, excludedFolder)
      .then(files => {
        const [exampleFile] = files;
        expect(exampleFile.includes('example.txt')).toBe(true);
        expect(files).toHaveLength(1);
        done();
      });
  });
});
