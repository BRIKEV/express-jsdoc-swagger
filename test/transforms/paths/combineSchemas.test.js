const jsdocInfo = require('../../../consumers/jsdocInfo');
const setPaths = require('../../../transforms/paths');
const parseComponents = require('../../../transforms/components');

test('should parse jsdoc path response with oneOf keyword', () => {
  const jsodInput = [`
      /**
       * GET /api/v1
       * @summary This is the summary of the endpoint
       * @return {oneOf|Song|Album} 200 - success response - application/json
       */
    `];
  const expected = {
    paths: {
      '/api/v1': {
        get: {
          deprecated: false,
          summary: 'This is the summary of the endpoint',
          parameters: [],
          tags: [],
          security: [],
          responses: {
            200: {
              description: 'success response',
              content: {
                'application/json': {
                  schema: {
                    oneOf: [
                      {
                        $ref: '#/components/schemas/Song',
                      },
                      {
                        $ref: '#/components/schemas/Album',
                      },
                    ],
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

test('should not parse when type is invalid', () => {
  global.console = { ...global.console, warn: jest.fn() };
  const jsodInput = [`
      /**
       * GET /api/v1
       * @summary This is the summary of the endpoint
       * @return {invalid|Song|Album} 200 - success response - application/json
       */
    `];
  const expected = {
    paths: {
      '/api/v1': {
        get: {
          deprecated: false,
          summary: 'This is the summary of the endpoint',
          parameters: [],
          tags: [],
          security: [],
          responses: {
            200: {
              description: 'success response',
              content: {
                'application/json': {
                  schema: {},
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
  expect(console.warn).toHaveBeenCalled();
});

test('should not parse component with anyOf keyword', () => {
  const jsodInput = [`
    /**
     * A song
     * @typedef {object} Song
     * @property {string} title.required
     * @property {string} artist
     * @property {number} year
     */
  `,
  `
    /**
     * Album
     * @typedef {object} Album
     * @property {anyOf|Song|Album} firstSong
     */
  `];
  const expected = {
    components: {
      schemas: {
        Song: {
          type: 'object',
          required: [
            'title',
          ],
          description: 'A song',
          properties: {
            title: {
              type: 'string',
              description: '',
            },
            artist: {
              type: 'string',
              description: '',
            },
            year: {
              type: 'number',
              description: '',
            },
          },
        },
        Album: {
          type: 'object',
          description: 'Album',
          properties: {
            firstSong: {
              description: '',
              anyOf: [
                {
                  $ref: '#/components/schemas/Song',
                },
                {
                  $ref: '#/components/schemas/Album',
                },
              ],
            },
          },
        },
      },
    },
  };
  const parsedJSDocs = jsdocInfo()(jsodInput);
  const result = parseComponents({}, parsedJSDocs);
  expect(result).toEqual(expected);
});

test('should parse jsdoc path reference params with allOf keyword', () => {
  const jsodInput = [`
    /**
     * GET /api/v1
     * @param {allOf|Song|Album} name.query.required - name param description
     */
  `];
  const expected = {
    paths: {
      '/api/v1': {
        get: {
          deprecated: false,
          summary: '',
          responses: {},
          tags: [],
          security: [],
          parameters: [{
            deprecated: false,
            description: 'name param description',
            in: 'query',
            name: 'name',
            required: true,
            schema: {
              allOf: [
                {
                  $ref: '#/components/schemas/Song',
                },
                {
                  $ref: '#/components/schemas/Album',
                },
              ],
            },
          }],
        },
      },
    },
  };
  const parsedJSDocs = jsdocInfo()(jsodInput);
  const result = setPaths({}, parsedJSDocs);
  expect(result).toEqual(expected);
});
test('should not parse component with anyOf array keyword', () => {
  const jsodInput = [`
    /**
     * A song
     * @typedef {object} Song
     * @property {string} title.required
     * @property {string} artist
     * @property {number} year
     */
  `,
  `
    /**
     * Album
     * @typedef {object} Album
     * @property {anyOf|Song[]|Album|string|string[]|null} firstSong
     */
  `];
  const expected = {
    components: {
      schemas: {
        Song: {
          type: 'object',
          required: [
            'title',
          ],
          description: 'A song',
          properties: {
            title: {
              type: 'string',
              description: '',
            },
            artist: {
              type: 'string',
              description: '',
            },
            year: {
              type: 'number',
              description: '',
            },
          },
        },
        Album: {
          type: 'object',
          description: 'Album',
          properties: {
            firstSong: {
              description: '',
              anyOf: [
                {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Song',
                  },
                },
                {
                  $ref: '#/components/schemas/Album',
                },
                {
                  type: 'string',
                },
                {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                },
              ],
              nullable: true,
            },
          },
        },
      },
    },
  };
  const parsedJSDocs = jsdocInfo()(jsodInput);
  const result = parseComponents({}, parsedJSDocs);
  expect(result).toEqual(expected);
});
