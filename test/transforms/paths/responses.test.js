const jsdocInfo = require('../../../consumers/jsdocInfo');
const setPaths = require('../../../transforms/paths');

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
            deprecated: false,
            summary: 'This is the summary or description of the endpoint',
            parameters: [],
            tags: [],
            security: [],
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

  it('should not parse jsdoc with wrong info and return warning in the console', () => {
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
            deprecated: false,
            summary: 'This is the summary or description of the endpoint',
            responses: {},
            parameters: [],
            tags: [],
            security: [],
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

  it('should parse jsdoc with wrong info and return warning in the console', () => {
    global.console = { ...global.console, warn: jest.fn() };
    const jsodInput = [`
      /**
       * GET /api/v1
       * @summary This is the summary or description of the endpoint
       * @return {object} default - success response - application/json
       */
    `];
    const expected = {
      paths: {
        '/api/v1': {
          get: {
            deprecated: false,
            summary: 'This is the summary or description of the endpoint',
            parameters: [],
            tags: [],
            security: [],
            responses: {
              default: {
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
    // eslint-disable-next-line
    expect(console.warn).not.toHaveBeenCalled();
  });

  it('should parse jsdoc path response with array type', () => {
    const jsodInput = [`
      /**
       * GET /api/v1
       * @summary This is the summary or description of the endpoint
       * @return {array<integer>} 200 - success response - application/json
       */
    `];
    const expected = {
      paths: {
        '/api/v1': {
          get: {
            deprecated: false,
            summary: 'This is the summary or description of the endpoint',
            parameters: [],
            tags: [],
            security: [],
            responses: {
              200: {
                description: 'success response',
                content: {
                  'application/json': {
                    schema: {
                      type: 'array',
                      items: {
                        type: 'integer',
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

  it('should parse jsdoc path response with components', () => {
    const jsodInput = [`
      /**
       * GET /api/v1
       * @summary This is the summary or description of the endpoint
       * @return {Song} 200 - success response - application/json
       */
    `];
    const expected = {
      paths: {
        '/api/v1': {
          get: {
            deprecated: false,
            summary: 'This is the summary or description of the endpoint',
            parameters: [],
            tags: [],
            security: [],
            responses: {
              200: {
                description: 'success response',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/Song',
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

  it('should parse jsdoc path response with array of components', () => {
    const jsodInput = [`
      /**
       * GET /api/v1
       * @summary This is the summary or description of the endpoint
       * @return {array<Song>} 200 - success response - application/json
       */
    `];
    const expected = {
      paths: {
        '/api/v1': {
          get: {
            deprecated: false,
            summary: 'This is the summary or description of the endpoint',
            parameters: [],
            tags: [],
            security: [],
            responses: {
              200: {
                description: 'success response',
                content: {
                  'application/json': {
                    schema: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/Song',
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

  it('should parse jsdoc path spec with more than one response and multiple content types', () => {
    const jsodInput = [`
      /**
       * GET /api/v1
       * @summary This is the summary or description of the endpoint
       * @return {object} 200 - success response - application/json
       * @return {object} 400 - Bad request response
       * @return {string} 400 - Bad request response - application/xml
       */
    `];
    const expected = {
      paths: {
        '/api/v1': {
          get: {
            deprecated: false,
            summary: 'This is the summary or description of the endpoint',
            parameters: [],
            tags: [],
            security: [],
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
                  'application/xml': {
                    schema: {
                      type: 'string',
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

  it('should parse jsdoc path response with examples', () => {
    const jsdocInput = [`
      /**
       * GET /api/v1
       * @summary This is the summary or description of the endpoint
       * @return {Song} 200 - success response - application/json
       * @return {object} 403 - forbidden response - application/json
       * @example response - 200 - example success response
       * {
       *   "title": "untitled song",
       *   "artist": "anonymous"
       * }
       * @example response - 403 - example error response
       * {
       *   "error": "failed to retrieve results"
       * }
       */
    `];
    const expected = {
      paths: {
        '/api/v1': {
          get: {
            deprecated: false,
            summary: 'This is the summary or description of the endpoint',
            parameters: [],
            tags: [],
            security: [],
            responses: {
              200: {
                description: 'success response',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/Song',
                    },
                    examples: {
                      example1: {
                        summary: 'example success response',
                        value: '{\n  "title": "untitled song",\n  "artist": "anonymous"\n}',
                      },
                    },
                  },
                },
              },
              403: {
                description: 'forbidden response',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                    },
                    examples: {
                      example2: {
                        summary: 'example error response',
                        value: '{\n  "error": "failed to retrieve results"\n}',
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
    const parsedJSDocs = jsdocInfo()(jsdocInput);
    const result = setPaths({}, parsedJSDocs);
    expect(result).toEqual(expected);
  });
});
