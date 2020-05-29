const jsdocInfo = require('../../../consumers/jsdocInfo');
const parseTags = require('../../../transforms/tags');

describe('parseTags method', () => {
  it('should return empty tags array with not params', () => {
    const initialState = {};
    const tags = undefined;
    const expected = {
      tags: [],
    };
    const result = parseTags(initialState, tags);
    expect(result).toEqual(expected);
  });

  it('should return empty tags array with not an array as parameter', () => {
    const initialState = {};
    const tags = 2;
    const expected = {
      tags: [],
    };
    const result = parseTags(initialState, tags);
    expect(result).toEqual(expected);
  });

  it('Should parse jsdoc tags into tags array with name and description', () => {
    const jsodInput = [`
      /**
       * GET /api/v1/album
       * @tags album - album tag description
       */
    `,
    `
      /**
       * GET /api/v1/artists
       * @tags artist - artist tag description
       */
    `];
    const expected = {
      tags: [
        {
          name: 'album',
          description: 'album tag description',
        },
        {
          name: 'artist',
          description: 'artist tag description',
        },
      ],
    };
    const parsedJSDocs = jsdocInfo()(jsodInput);
    const result = parseTags({}, parsedJSDocs);
    expect(result).toEqual(expected);
  });

  it('Should parse jsdoc tags into tags array without duplicate tags', () => {
    const jsodInput = [`
      /**
       * GET /api/v1/album
       * @tags album - album tag description
       */
    `,
    `
      /**
       * GET /api/v1/years
       * @tags artist - artist tag description
       */
    `,
    `
      /**
       * GET /api/v1/artists
       * @tags artist - artist tag description
       */
    `];
    const expected = {
      tags: [
        {
          name: 'album',
          description: 'album tag description',
        },
        {
          name: 'artist',
          description: 'artist tag description',
        },
      ],
    };
    const parsedJSDocs = jsdocInfo()(jsodInput);
    const result = parseTags({}, parsedJSDocs);
    expect(result).toEqual(expected);
  });
});
