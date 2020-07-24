const processSwagger = require('../../../processSwagger');

const options = {
  info: {
    version: '1.0.0',
    title: 'Albums store',
    license: {
      name: 'MIT',
    },
  },
  filesPattern: './jsdoc-example.js',
  baseDir: __dirname,
};

test('should parse components jsdoc from jsdoc-example', async () => {
  const expected = {
    openapi: '3.0.0',
    info: {
      title: 'Albums store',
      description: 'Add your description',
      license: { name: 'MIT', url: '' },
      termsOfService: '',
      version: '1.0.0',
    },
    servers: [],
    security: undefined,
    paths: {
      '/api/v1': {
        get: {
          deprecated: false,
          summary: 'This is the summary or description of the endpoint',
          responses: {
            200: {
              description: 'success response',
              content: {
                'application/json': {
                  schema: {
                    type: 'string',
                  },
                },
              },
            },
          },
          parameters: [
            {
              name: 'name',
              in: 'path',
              description: 'name param description',
              required: true,
              deprecated: false,
              schema: {
                type: 'string',
              },
            },
            {
              name: 'phone',
              in: 'path',
              description: 'phone number',
              required: true,
              deprecated: false,
              schema: {
                type: 'number',
              },
            },
          ],
          security: [],
          tags: [],
        },
      },
      '/api/v1/albums': {
        get: {
          deprecated: false,
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
          parameters: [
            {
              name: 'name',
              in: 'path',
              description: 'name param description',
              required: true,
              deprecated: false,
              schema: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
            },
            {
              name: 'phone',
              in: 'path',
              description: '',
              required: true,
              deprecated: false,
              schema: {
                type: 'number',
              },
            },
          ],
          security: [],
          tags: [],
        },
      },
    },
    tags: [],
    components: {
      schemas: {},
    },
  };
  const result = await processSwagger(options);
  expect(result).toEqual(expected);
});
