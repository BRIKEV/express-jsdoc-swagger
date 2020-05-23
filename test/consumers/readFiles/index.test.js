const readFiles = require('../../../consumers/readFiles');

describe('readFiles', () => {
  it('should return empty array when we do not send params', done => {
    const input = undefined;
    const expected = [];
    readFiles(input)
      .then(result => {
        expect(result).toEqual(expected);
        done();
      })
      .catch(done);
  });

  it('should return empty array when we do not send array as param', done => {
    const input = [
      `${__dirname}/fixtures/example.txt`,
      `${__dirname}/fixtures/example-2.txt`,
    ];
    readFiles(input)
      .then(result => {
        const [firstFile, secondFile] = result;
        expect(firstFile).toEqual('hello world');
        expect(secondFile).toEqual('goodbye world');
        expect(result).toHaveLength(2);
        done();
      })
      .catch(done);
  });
});
