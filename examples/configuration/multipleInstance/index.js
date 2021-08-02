const express = require('express');

const logger = require('../../utils/logger');
const expressJSDocSwagger = require('../../..');

const app = express();
const port = 3000;

// It is a fictitious configuration
const optionsClientAPIInstance = {
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
  multiple: true,
};

// It is a fictitious configuration
const optionsAdminAPIInstance = {
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
  multiple: true,
};

const instance = expressJSDocSwagger(app)(optionsClientAPIInstance);
const instance2 = expressJSDocSwagger(app)(optionsAdminAPIInstance);

instance.on('finish', data => {
  console.log(data);
})

instance2.on('finish', data => {
  console.log(data);
})


app.listen(port, () => logger.info(`Example app listening at http://localhost:${port}`));
