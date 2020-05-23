const jsdocInfo = require('../../../consumers/jsdocInfo');
const setPaths = require('../../../transforms/paths');

describe('setPaths method', () => {
  it('should return empty array with not params', () => {
    const input = undefined;
    const expected = {
      paths: {},
    };
    const result = setPaths(input);
    expect(result).toEqual(expected);
  });

  it('should return empty array with not an array as parameter', () => {
    const input = 2;
    const expected = {
      paths: {},
    };
    const result = setPaths(input);
    expect(result).toEqual(expected);
  });

  it('should parse jsdoc path spec', () => {
    const jsodInput = [`
      /**
       * GET /api/v1
       * @summary This is the summary or description of the endpoint
       * @return {object} 200 - success response - application/json
       */
    `];
    const expected = {
      paths: {
        '/api/v1': {
          get: {
            summary: 'This is the summary or description of the endpoint',
            responses: {
              200: {
                description: 'success response',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                    },
                  },
                },
              },
            },
          },
        },
      },
    };
    const parsedJSDocs = jsdocInfo()(jsodInput);
    const result = setPaths({}, parsedJSDocs);
    expect(result).toEqual(expected);
  });
});
