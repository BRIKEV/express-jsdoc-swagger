const globFilesMatches = require('../../../consumers/globFilesMatches');

describe('glob Files matches method', () => {
  it('should return error when required param is not send', done => {
    globFilesMatches()
      .catch(error => {
        expect(error.message).toEqual('baseDir and filePath are required');
        done();
      });
  });

  it('should return error when baseDir is undefined', done => {
    const baseDir = undefined;
    const filePath = './**/**.txt';
    globFilesMatches(baseDir, filePath)
      .catch(error => {
        expect(error.message).toEqual('baseDir and filePath are required');
        done();
      });
  });

  it('should return error when filePath is not a string', done => {
    const baseDir = __dirname;
    const filePath = 3;
    globFilesMatches(baseDir, filePath)
      .catch(error => {
        expect(error.message).toEqual('files pattern has to be a type of string');
        done();
      });
  });

  it('should return error when glob method not receives a string type', done => {
    const baseDir = 2; // This forces error in glob method
    const filePath = './**/**.txt';
    globFilesMatches(baseDir, filePath)
      .catch(error => {
        expect(error.message).toEqual('The "paths[0]" argument must be of type string. Received type number (2)');
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

  describe('Array of file paths', () => {
    it('should return error when passed empty array', done => {
      const baseDir = __dirname;
      const filePath = [];
      globFilesMatches(baseDir, filePath)
        .catch(error => {
          expect(error.message).toEqual('if you submit an array of filesPattern it must contain at least one pattern');
          done();
        });
    });

    it('should return error when one of the array parameters is not a string', done => {
      const baseDir = __dirname;
      const filePath = ['a', 'b', 'c', 2];
      globFilesMatches(baseDir, filePath)
        .catch(error => {
          expect(error.message).toEqual('all file patterns have to be strings');
          done();
        });
    });

    it('should return example.txt and excluded/example.txt file', done => {
      const baseDir = __dirname;
      const filePath = ['./**/**.txt'];
      globFilesMatches(baseDir, filePath)
        .then(files => {
          const [exampleFile, excludedFile] = files;
          expect(exampleFile.includes('example.txt')).toBe(true);
          expect(excludedFile.includes('excluded/example.txt')).toBe(true);
          expect(files).toHaveLength(2);
          done();
        });
    });

    it('should return example.txt and excluded/example.txt file if multiple paths were passed', done => {
      const baseDir = __dirname;
      const filePath = ['./fixtures/example.txt', './fixtures/excluded/example.txt'];
      globFilesMatches(baseDir, filePath)
        .then(files => {
          const [exampleFile, excludedFile] = files;
          expect(exampleFile.includes('example.txt')).toBe(true);
          expect(excludedFile.includes('excluded/example.txt')).toBe(true);
          expect(files).toHaveLength(2);
          done();
        });
    });

    it('should not return duplicated paths', done => {
      const baseDir = __dirname;
      const filePath = ['./**/**.txt', './**/**.txt', './fixtures/example.txt'];
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
      const filePath = ['./**/**.txt'];
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
});
