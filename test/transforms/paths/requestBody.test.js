const chalk = require('chalk');

const jsdocInfo = require('../../../consumers/jsdocInfo');
const setPaths = require('../../../transforms/paths');

describe('request body tests', () => {
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
    global.console = { ...global.console, warn: jest.fn() };
    const jsodInput = [`
      /**
       * POST /api/v1
       * @param {array<string>} request.body.required - name body description
       * @param {number} body
       */
    `];
    const expected = {
      paths: {
        '/api/v1': {
          post: {
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
    expect(console.warn).toHaveBeenCalledWith(chalk.yellow('You should only provide one request body'));
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
});
