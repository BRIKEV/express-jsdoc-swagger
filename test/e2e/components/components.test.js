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
    paths: {},
    tags: [],
    components: {
      schemas: {
        Song: {
          description: 'A song',
          required: [
            'title',
          ],
          type: 'object',
          properties: {
            title: {
              description: 'The title',
              type: 'string',
            },
            artist: {
              description: 'The artist',
              type: 'string',
            },
            year: {
              description: 'The year',
              type: 'number',
              format: 'double',
            },
          },
        },
        Author: {
          description: 'Author model',
          required: [
            'name',
          ],
          type: 'object',
          properties: {
            name: {
              description: 'Author name',
              type: 'string',
            },
            age: {
              description: 'Author age',
              type: 'number',
              format: 'double',
            },
          },
        },
        Album: {
          description: 'Album',
          required: [],
          type: 'object',
          properties: {
            firstSong: {
              description: '',
              $ref: '#/components/schemas/Song',
            },
            author: {
              description: '',
              $ref: '#/components/schemas/Author',
            },
          },
        },
      },
    },
  };
  const result = await processSwagger(options);
  expect(result).toEqual(expected);
});
