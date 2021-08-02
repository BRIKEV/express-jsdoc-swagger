const multipleInstance = require('.');

const instance1Options = {
  info: {
    version: '1.0.0',
    title: 'Admin API',
    description: 'Only admin accounts authorized to use this API',
  },
  security: {
    BearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
  filesPattern: './admin-v1-docs.js',
  swaggerUIPath: '/api/v1/admin/docs',
  baseDir: __dirname,
  exposeSwaggerUI: true,
  exposeApiDocs: true,
  apiDocsPath: '/api/v1/admin/api-docs',
};

const instance2Options = {
  info: {
    version: '1.0.0',
    title: 'Client API',
    description: 'For client',
  },
  filesPattern: './client-v1-docs.js',
  swaggerUIPath: '/api/v1/client/docs',
  baseDir: __dirname,
  exposeSwaggerUI: true,
  exposeApiDocs: true,
  apiDocsPath: '/api/v1/client/api-docs',
};

describe('multipleInstance test', () => {
  it('multipleInstance should be different when multiple option is "true"', async () => {
    const instance1Data = await multipleInstance({
      ...instance1Options,
      multiple: true,
    });
    const instance2Data = await multipleInstance({
      ...instance2Options,
      multiple: true,
    });
    expect(instance1Data).not.toEqual(instance2Data);
  });
});
