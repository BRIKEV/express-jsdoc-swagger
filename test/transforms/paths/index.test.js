const jsdocInfo = require('../../../consumers/jsdocInfo');
const setPaths = require('../../../transforms/paths');

describe('setPaths method', () => {
  it('should return empty array with not params', () => {
    const initialState = {};
    const paths = undefined;
    const expected = {
      paths: {},
    };
    const result = setPaths(initialState, paths);
    expect(result).toEqual(expected);
  });

  it('should return empty array with not an array as parameter', () => {
    const initialState = {};
    const paths = 2;
    const expected = {
      paths: {},
    };
    const result = setPaths(initialState, paths);
    expect(result).toEqual(expected);
  });

  it('should parse jsdoc path spec with one response, summary and endpoint info', () => {
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

  describe('response tests', () => {
    it('should parse jsdoc path spec with more than one response', () => {
      const jsodInput = [`
        /**
         * GET /api/v1
         * @summary This is the summary or description of the endpoint
         * @return {object} 200 - success response - application/json
         * @return {object} 400 - Bad request response
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
                400: {
                  description: 'Bad request response',
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

    it('should not jsdoc with wrong info and return warning in the console', () => {
      global.console = { ...global.console, warn: jest.fn() };
      const jsodInput = [`
        /**
         * GET /api/v1
         * @summary This is the summary or description of the endpoint
         * @return {object} 200 success response - application/json
         */
      `];
      const expected = {
        paths: {
          '/api/v1': {
            get: {
              summary: 'This is the summary or description of the endpoint',
              responses: {},
            },
          },
        },
      };
      const parsedJSDocs = jsdocInfo()(jsodInput);
      const result = setPaths({}, parsedJSDocs);
      expect(result).toEqual(expected);
      // eslint-disable-next-line
      expect(console.warn).toHaveBeenCalled();
    });

    it.only('should parse jsdoc path response with array type', () => {
      const jsodInput = [`
        /**
         * GET /api/v1
         * @summary This is the summary or description of the endpoint
         * @return {array<int>} 200 - success response - application/json
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
                        type: 'array',
                        items: {
                          type: 'int',
                        },
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
});
