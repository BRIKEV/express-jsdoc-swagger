const jsdocInfo = require('../../../consumers/jsdocInfo');
const setPaths = require('../../../transforms/paths');

describe('Paths - tags', () => {
  it('Should parse jsdoc tags params into array with tag name', () => {
    const jsodInput = [`
      /**
       * GET /api/v1
       * @tags album
       */
    `];
    const expected = {
      paths: {
        '/api/v1': {
          get: {
            deprecated: false,
            description: undefined,
            summary: '',
            tags: [
              'album',
            ],
            responses: {},
            parameters: [],
            security: [],
          },
        },
      },
    };
    const parsedJSDocs = jsdocInfo()(jsodInput);
    const result = setPaths({}, parsedJSDocs);
    expect(result).toEqual(expected);
  });

  it('Should parse jsdoc multiple tags params into array of tags', () => {
    const jsodInput = [`
      /**
       * GET /api/v1
       * @tags album
       * @tags Years
       */
    `];
    const expected = {
      paths: {
        '/api/v1': {
          get: {
            deprecated: false,
            description: undefined,
            summary: '',
            tags: [
              'album',
              'Years',
            ],
            responses: {},
            parameters: [],
            security: [],
          },
        },
      },
    };
    const parsedJSDocs = jsdocInfo()(jsodInput);
    const result = setPaths({}, parsedJSDocs);
    expect(result).toEqual(expected);
  });

  it('Should parse jsdoc multiple tags params into array of tags without description', () => {
    const jsodInput = [`
      /**
       * GET /api/v1
       * @tags album
       * @tags Years - tag description
       */
    `];
    const expected = {
      paths: {
        '/api/v1': {
          get: {
            deprecated: false,
            description: undefined,
            summary: '',
            tags: [
              'album',
              'Years',
            ],
            responses: {},
            parameters: [],
            security: [],
          },
        },
      },
    };
    const parsedJSDocs = jsdocInfo()(jsodInput);
    const result = setPaths({}, parsedJSDocs);
    expect(result).toEqual(expected);
  });
});
