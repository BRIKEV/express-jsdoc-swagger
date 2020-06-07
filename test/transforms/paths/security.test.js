const jsdocInfo = require('../../../consumers/jsdocInfo');
const setPaths = require('../../../transforms/paths');

describe('Paths - security', () => {
  it('Should parse jsdoc security params into security array with each security type', () => {
    const jsodInput = [`
      /**
       * POST /api/v1/song
       * @summary Create new song
       * @security BasicAuth
       */
    `];
    const expected = {
      paths: {
        '/api/v1/song': {
          post: {
            deprecated: false,
            summary: 'Create new song',
            security: [
              {
                BasicAuth: [],
              },
            ],
            tags: [],
            responses: {},
            parameters: [],
          },
        },
      },
    };
    const parsedJSDocs = jsdocInfo()(jsodInput);
    const result = setPaths({}, parsedJSDocs);
    expect(result).toEqual(expected);
  });
});
