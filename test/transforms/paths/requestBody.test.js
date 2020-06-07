const jsdocInfo = require('../../../consumers/jsdocInfo');
const setPaths = require('../../../transforms/paths');

describe('request body tests', () => {
  it('should not add requestBody when there is no body params', () => {
    const jsodInput = [`
      /**
       * POST /api/v1/
       */
    `];
    const expected = {
      paths: {
        '/api/v1/': {
          post: {
            deprecated: false,
            summary: '',
            responses: {},
            tags: [],
            parameters: [],
          },
        },
      },
    };
    const parsedJSDocs = jsdocInfo()(jsodInput);
    const result = setPaths({}, parsedJSDocs);
    expect(result).toEqual(expected);
  });

  it('should parse jsdoc request body', () => {
    const jsodInput = [`
      /**
       * POST /api/v1
       * @param {string} request.body.required - name body description
       */
    `];
    const expected = {
      paths: {
        '/api/v1': {
          post: {
            deprecated: false,
            summary: '',
            responses: {},
            tags: [],
            parameters: [],
            requestBody: {
              description: 'name body description',
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'string',
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

  it('should parse jsdoc request body with array type and no description', () => {
    const jsodInput = [
      `
      /**
       * POST /api/v1/albums
       * @param {array<object>} request.body.required
       */
    `];
    const expected = {
      paths: {
        '/api/v1/albums': {
          post: {
            deprecated: false,
            summary: '',
            responses: {},
            tags: [],
            parameters: [],
            requestBody: {
              description: '',
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
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

  it('should parse jsdoc request body with array type', () => {
    const jsodInput = [`
      /**
       * POST /api/v1
       * @param {array<string>} request.body.required - name body description
       */
    `];
    const expected = {
      paths: {
        '/api/v1': {
          post: {
            deprecated: false,
            summary: '',
            responses: {},
            tags: [],
            parameters: [],
            requestBody: {
              description: 'name body description',
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
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

  it('should parse jsdoc path multiple bodys', () => {
    const jsodInput = [`
      /**
       * POST /api/v1
       * @param {number} body
       * @param {array<string>} request.body.required - name body description
       */
    `];
    const expected = {
      paths: {
        '/api/v1': {
          post: {
            deprecated: false,
            summary: '',
            responses: {},
            tags: [],
            parameters: [],
            requestBody: {
              description: 'name body description',
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
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

  it('should parse jsdoc path reference bodys', () => {
    const jsodInput = [`
      /**
       * POST /api/v1
       * @param {Song} request.body.required - name body description
       */
    `];
    const expected = {
      paths: {
        '/api/v1': {
          post: {
            deprecated: false,
            summary: '',
            responses: {},
            tags: [],
            parameters: [],
            requestBody: {
              description: 'name body description',
              required: true,
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
    };
    const parsedJSDocs = jsdocInfo()(jsodInput);
    const result = setPaths({}, parsedJSDocs);
    expect(result).toEqual(expected);
  });

  it('should parse jsdoc request body with array of references', () => {
    const jsodInput = [`
      /**
       * POST /api/v1
       * @param {array<Song>} request.body.required - name body description
       */
    `];
    const expected = {
      paths: {
        '/api/v1': {
          post: {
            deprecated: false,
            summary: '',
            responses: {},
            tags: [],
            parameters: [],
            requestBody: {
              description: 'name body description',
              required: true,
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
    };
    const parsedJSDocs = jsdocInfo()(jsodInput);
    const result = setPaths({}, parsedJSDocs);
    expect(result).toEqual(expected);
  });

  it('should parse jsdoc request body with array of references for different content type', () => {
    const jsodInput = [`
      /**
       * POST /api/v1
       * @param {array<Song>} request.body.required - name body description
       * @param {Song} request.body.required - name body description - application/xml
       */
    `];
    const expected = {
      paths: {
        '/api/v1': {
          post: {
            deprecated: false,
            summary: '',
            responses: {},
            tags: [],
            parameters: [],
            requestBody: {
              description: 'name body description',
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Song',
                    },
                  },
                },
                'application/xml': {
                  schema: {
                    $ref: '#/components/schemas/Song',
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
