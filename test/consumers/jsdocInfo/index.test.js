const jsdocInfo = require('../../../consumers/jsdocInfo');

describe('jsdocInfo method', () => {
  it('should return function instance', () => {
    const result = jsdocInfo();
    expect(result).toBeInstanceOf(Function);
  });

  it('should return empty array when we do not send params', () => {
    const input = undefined;
    const expected = [];
    const result = jsdocInfo()(input);
    expect(result).toEqual(expected);
  });

  it('should return empty array when we do not send array as param', () => {
    const input = 3;
    const expected = [];
    const result = jsdocInfo()(input);
    expect(result).toEqual(expected);
  });

  it('should return jsdoc parsed', () => {
    const input = [`
    /**
     * @param  {string} param1
     * @param  {string} param2
     * @return {string} result
     */
    
    // simple comment
    `];
    const result = jsdocInfo()(input);
    expect(result).toHaveLength(1);
    const NUMBER_TAGS = 3;
    expect(result[0].tags).toHaveLength(NUMBER_TAGS);
  });
});
