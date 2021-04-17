const processSwagger = require('../../../processSwagger');

const options = {
  info: {
    version: '1.0.0',
    title: 'Albums store',
    license: {
      name: 'MIT',
      url: 'http://example.com',
    },
    description: 'API desctiption',
    contact: {
      name: 'contact name',
      url: 'http://example.com',
      email: 'test@test.com',
    },
    termsOfService: 'http://example.com',
  },
  servers: [
    {
      url: 'https://{username}.gigantic-server.com:{port}/{basePath}',
      description: 'The production API server',
      variables: {
        username: {
          default: 'demo',
          description: 'this value is assigned by the service provider, in this example `gigantic-server.com`',
        },
        port: {
          enum: [
            '8443',
            '443',
          ],
          default: '8443',
        },
        basePath: {
          default: 'v2',
        },
      },
    },
  ],
  filesPattern: './main.js',
  baseDir: __dirname,
};

test('should parse basic info', async () => {
  const expected = {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Albums store',
      license: {
        name: 'MIT',
        url: 'http://example.com',
      },
      description: 'API desctiption',
      contact: {
        name: 'contact name',
        url: 'http://example.com',
        email: 'test@test.com',
      },
      termsOfService: 'http://example.com',
    },
    servers: [
      {
        url: 'https://{username}.gigantic-server.com:{port}/{basePath}',
        description: 'The production API server',
        variables: {
          username: {
            default: 'demo',
            description: 'this value is assigned by the service provider, in this example `gigantic-server.com`',
          },
          port: {
            enum: [
              '8443',
              '443',
            ],
            default: '8443',
          },
          basePath: {
            default: 'v2',
          },
        },
      },
    ],
    security: undefined,
    paths: {},
    tags: [],
    components: {
      schemas: {},
    },
  };
  const result = await processSwagger(options);
  expect(result.swaggerObject).toEqual(expected);
});
