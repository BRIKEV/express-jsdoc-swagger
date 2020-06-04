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

  it('Should not parse params that aren\'t tags', () => {
    const jsodInput = [`
      /**
       * GET /api/v1/album
       * @summary example of no summary
       */
    `];
    const expected = {
      tags: [],
    };
    const parsedJSDocs = jsdocInfo()(jsodInput);
    const result = parseTags({}, parsedJSDocs);
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

  it('Should return an empty string if the tag has no description', () => {
    const jsodInput = [`
      /**
       * GET /api/v1/album
       * @tags album - album tag description
       */
    `,
    `
      /**
       * GET /api/v1/years
       * @tags artist
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
          description: '',
        },
      ],
    };
    const parsedJSDocs = jsdocInfo()(jsodInput);
    const result = parseTags({}, parsedJSDocs);
    expect(result).toEqual(expected);
  });

  it('Should return one tag with its description', () => {
    const jsodInput = [`
      /**
       * GET /api/v1/album
       * @tags album
       */
    `,
    `
      /**
       * GET /api/v1/years
       * @tags album - album tag description
       */
    `];
    const expected = {
      tags: [
        {
          name: 'album',
          description: 'album tag description',
        },
      ],
    };
    const parsedJSDocs = jsdocInfo()(jsodInput);
    const result = parseTags({}, parsedJSDocs);
    expect(result).toEqual(expected);
  });
});
