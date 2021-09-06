const getOnlyComments = require('../../../consumers/getOnlyComments');

describe('get only comments consumer method', () => {
  it('should return empty array with not params', () => {
    const input = undefined;
    const expected = [];
    const result = getOnlyComments(input);
    expect(result).toEqual(expected);
  });

  it('should return empty array with not an array as parameter', () => {
    const input = 2;
    const expected = [];
    const result = getOnlyComments(input);
    expect(result).toEqual(expected);
  });

  it('should return empty array when there is no comments', () => {
    const input = [`
      This is a piece of text
        with no
          comments
    `];
    const expected = [];
    const result = getOnlyComments(input);
    expect(result).toEqual(expected);
  });

  it('should return empty array for simple comments', () => {
    const input = [`
    // this is a comment
      This is a piece of text
        with
        // This is a second comment
          comment
    // second comment
    `];
    const expected = [];
    const result = getOnlyComments(input);
    expect(result).toEqual(expected);
  });

  it('should return array with multiline comments', () => {
    const input = [`
    /* this is a comment */
      This is a piece of text
        with
        /* This is a second comment */
          comments
    `];
    const expected = ['/* this is a comment */', '/* This is a second comment */'];
    const result = getOnlyComments(input);
    expect(result).toHaveLength(2);
    expect(result).toEqual(expected);
  });

  it('should return JSdoc comment', () => {
    const input = [`
    /**
     * @param  {[type]}
     * @param  {[type]}
     * @return {[type]}
     */
    
    // simple comment
    `];
    const expected = [`/**
     * @param  {[type]}
     * @param  {[type]}
     * @return {[type]}
     */`];
    const result = getOnlyComments(input);
    expect(result).toHaveLength(1);
    expect(result).toEqual(expected);
  });

  it('should return only the JSdoc comment when we add a regex in the file pattern', () => {
    const input = [`
    const pattern = './*.js';
    /**
     * @param  {[type]}
     * @param  {[type]}
     * @return {[type]}
     */

    `];
    const expected = [`/**
     * @param  {[type]}
     * @param  {[type]}
     * @return {[type]}
     */`];
    const result = getOnlyComments(input);
    expect(result).toHaveLength(1);
    expect(result).toEqual(expected);
  });

  it('should return multiline and JSdoc comment', () => {
    const input = [`
    /* this is a comment */
      This is a piece of text
      // simple comment
        with
        /* This is a second comment */
          comments
    `, `
    /**
     * @param  {[type]}
     * @param  {[type]}
     * @return {[type]}
     */
    
    // simple comment
    `];
    const expected = ['/* this is a comment */', '/* This is a second comment */', `/**
     * @param  {[type]}
     * @param  {[type]}
     * @return {[type]}
     */`];
    const result = getOnlyComments(input);
    expect(result).toHaveLength(3);
    expect(result).toEqual(expected);
  });

  it('should return JSdoc comment that is not at the begining of the line', () => {
    const input = [`
      File with comments with tabulation
    
      /**
       * @param  {[type]}
       * @param  {[type]}
       * @return {[type]}
       */
    `];
    const expected = [`/**
       * @param  {[type]}
       * @param  {[type]}
       * @return {[type]}
       */`];
    const result = getOnlyComments(input);
    expect(result).toHaveLength(1);
    expect(result).toEqual(expected);
  });
});
