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
  file: './main.js',
  baseDir: __dirname,
};

test('should called logger method', async () => {
  const spy = jest.fn();
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
    servers: [],
    security: undefined,
  };
  await processSwagger(options, spy);
  expect(spy).toHaveBeenCalledTimes(5);
  expect(spy).toHaveBeenNthCalledWith(1, {
    entity: 'basicInfo',
    swaggerObject: expected,
  });
  expect(spy).toHaveBeenNthCalledWith(2, {
    entity: 'securitySchemas',
    swaggerObject: {
      ...expected,
      components: {},
    },
  });
  expect(spy).toHaveBeenNthCalledWith(3, {
    entity: 'paths',
    swaggerObject: {
      ...expected,
      components: {},
      paths: {},
    },
  });
  expect(spy).toHaveBeenNthCalledWith(4, {
    entity: 'components',
    swaggerObject: {
      ...expected,
      components: {
        schemas: {},
      },
      paths: {},
    },
  });
  expect(spy).toHaveBeenNthCalledWith(5, {
    entity: 'tags',
    swaggerObject: {
      ...expected,
      components: {
        schemas: {},
      },
      paths: {},
      tags: [],
    },
  });
});
