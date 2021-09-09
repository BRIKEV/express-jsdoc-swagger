const jsdocInfo = require('../../../consumers/jsdocInfo');
const setPaths = require('../../../transforms/paths');

describe('form requestBody tests', () => {
  it('should add request body using form examples', () => {
    const jsodInput = [`
      /**
       * POST /api/v1/
       * @param {string} id.form.required - id description
       * @param {string} title.form.required - title description
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
            security: [],
            requestBody: {
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        description: 'id description',
                      },
                      title: {
                        type: 'string',
                        description: 'title description',
                      },
                    },
                    required: ['id', 'title'],
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

  it('should add request body using form examples with params', () => {
    const jsodInput = [`
      /**
       * POST /api/v1/
       * @param {string} name.path.required - name param description
       * @param {string} id.form.required - id description
       * @param {string} title.form.required - title description
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
            security: [],
            parameters: [
              {
                deprecated: false,
                description: 'name param description',
                in: 'path',
                name: 'name',
                required: true,
                schema: {
                  type: 'string',
                },
              },
            ],
            requestBody: {
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        description: 'id description',
                      },
                      title: {
                        type: 'string',
                        description: 'title description',
                      },
                    },
                    required: ['id', 'title'],
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

  it('should not fail when a request.body is sent', () => {
    const jsodInput = [`
      /**
       * POST /api/v1/
       * @param {string} request.body.required - name body description
       * @param {string} id.form.required - id description
       * @param {string} title.form.required - title description
       */
    `];
    const expected = {
      paths: {
        '/api/v1/': {
          post: {
            deprecated: false,
            description: undefined,
            summary: '',
            responses: {},
            tags: [],
            parameters: [],
            security: [],
            requestBody: {
              description: 'name body description',
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        description: 'id description',
                      },
                      title: {
                        type: 'string',
                        description: 'title description',
                      },
                    },
                    required: ['id', 'title'],
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

  it('should add request body for different application content type', () => {
    const jsodInput = [`
      /**
       * POST /api/v1/
       * @param {string} name.path.required - name param description
       * @param {string} id.form.required - id description - application/x-www-form-urlencoded
       * @param {string} title.form.required - title description
       */
    `];
    const expected = {
      paths: {
        '/api/v1/': {
          post: {
            deprecated: false,
            description: undefined,
            summary: '',
            responses: {},
            tags: [],
            security: [],
            parameters: [
              {
                deprecated: false,
                description: 'name param description',
                in: 'path',
                name: 'name',
                required: true,
                schema: {
                  type: 'string',
                },
              },
            ],
            requestBody: {
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      title: {
                        type: 'string',
                        description: 'title description',
                      },
                    },
                    required: ['title'],
                  },
                },
                'application/x-www-form-urlencoded': {
                  schema: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        description: 'id description',
                      },
                    },
                    required: ['id'],
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

  it('should add request body for different application content type with an example', () => {
    const jsodInput = [`
      /**
       * POST /api/v1/
       * @param {string} name.path.required - name param description
       * @param {string} id.form.required - id description - application/x-www-form-urlencoded
       * @param {string} title.form.required - title description
       * @example request - example payload
       * sample input string
       */
    `];
    const expected = {
      paths: {
        '/api/v1/': {
          post: {
            deprecated: false,
            description: undefined,
            summary: '',
            responses: {},
            security: [],
            tags: [],
            parameters: [
              {
                deprecated: false,
                description: 'name param description',
                in: 'path',
                name: 'name',
                required: true,
                schema: {
                  type: 'string',
                },
              },
            ],
            requestBody: {
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      title: {
                        type: 'string',
                        description: 'title description',
                      },
                    },
                    required: ['title'],
                  },
                  examples: {
                    example1: {
                      summary: 'example payload',
                      value: 'sample input string',
                    },
                  },
                },
                'application/x-www-form-urlencoded': {
                  schema: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        description: 'id description',
                      },
                    },
                    required: ['id'],
                  },
                  examples: {
                    example1: {
                      summary: 'example payload',
                      value: 'sample input string',
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
