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

  it('should parse jsdoc path spec with one response, summary, description and endpoint info', () => {
    const jsodInput = [`
      /**
       * GET /api/v1
       * @summary This is the summary of the endpoint
       * @description This is the description of the endpoint
       * @return {object} 200 - success response - application/json
       */
    `];
    const expected = {
      paths: {
        '/api/v1': {
          get: {
            deprecated: false,
            summary: 'This is the summary of the endpoint',
            description: 'This is the description of the endpoint',
            parameters: [],
            security: [],
            tags: [],
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

  it('should parse jsdoc path spec with deprecated value', () => {
    const jsodInput = [`
      /**
       * GET /api/v1
       * @deprecated
       * @summary This is the summary of the endpoint
       * @return {object} 200 - success response - application/json
       */
    `];
    const expected = {
      paths: {
        '/api/v1': {
          get: {
            deprecated: true,
            summary: 'This is the summary of the endpoint',
            parameters: [],
            security: [],
            tags: [],
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

  it('should parse jsdoc path spec with multiple endpoints', () => {
    const jsodInput = [`
      /**
       * GET /api/v1
       * @deprecated
       * @summary This is the summary of the endpoint
       * @return {object} 200 - success response - application/json
       */
    `,
    `
      /**
       * GET /api/v1/songs
       * @summary This is the summary of the endpoint
       * @return {object} 200 - success response - application/json
       */
    `];
    const expected = {
      paths: {
        '/api/v1': {
          get: {
            deprecated: true,
            summary: 'This is the summary of the endpoint',
            parameters: [],
            security: [],
            tags: [],
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
        '/api/v1/songs': {
          get: {
            deprecated: false,
            description: undefined,
            summary: 'This is the summary of the endpoint',
            parameters: [],
            security: [],
            tags: [],
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

  it('should parse jsdoc path spec with multiple methods for one endpoint', () => {
    const jsodInput = [`
      /**
       * GET /api/v1
       * @deprecated
       * @summary This is the summary of the endpoint
       * @return {object} 200 - success response - application/json
       */
    `,
    `
      /**
       * POST /api/v1
       * @summary This is the summary of the endpoint
       * @return {object} 200 - success response - application/json
       */
    `];
    const expected = {
      paths: {
        '/api/v1': {
          get: {
            deprecated: true,
            summary: 'This is the summary of the endpoint',
            parameters: [],
            security: [],
            tags: [],
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
          post: {
            deprecated: false,
            description: undefined,
            summary: 'This is the summary of the endpoint',
            parameters: [],
            security: [],
            tags: [],
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
