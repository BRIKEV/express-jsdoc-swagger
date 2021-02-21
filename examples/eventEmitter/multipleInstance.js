const express = require('express');

const logger = require('../utils/logger');
const expressJSDocSwagger = require('../..');

const app = express();
const port = 3000;

// It is a fictitious configuration
const optionsClientAPIInstance = {
  info: {
    version: '1.0.0',
    title: 'Client API',
    description: 'For client',
  },
  filesPattern: '../api/client/v1/*.js',
  swaggerUIPath: '/api/v1/client/docs',
  baseDir: __dirname,
  exposeSwaggerUI: true,
  exposeApiDocs: true,
  apiDocsPath: '/api/v1/client/api-docs',
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
  filesPattern: '../api/admin/v1/*.js',
  swaggerUIPath: '/api/v1/admin/docs',
  baseDir: __dirname,
  exposeSwaggerUI: true,
  exposeApiDocs: true,
  apiDocsPath: '/api/v1/admin/api-docs',
};

const clientAPIInstance = expressJSDocSwagger(app)(optionsClientAPIInstance);
const adminAPIInstance = expressJSDocSwagger(app)(optionsAdminAPIInstance);

clientAPIInstance.on('error', error => {
  console.error(`[CLIENT]Error: ${error}`);
});

clientAPIInstance.on('process', ({ entity, swaggerObject }) => {
  console.log(`[CLIENT]entity: ${entity}`);
  console.log('[CLIENT]swaggerObject');
  console.log(swaggerObject);
});

clientAPIInstance.on('finish', swaggerObject => {
  console.log('[CLIENT]Finish');
  console.log(swaggerObject);
});

adminAPIInstance.on('error', error => {
  console.error(`[ADMIN]Error: ${error}`);
});

adminAPIInstance.on('process', ({ entity, swaggerObject }) => {
  console.log(`[ADMIN]entity: ${entity}`);
  console.log('[ADMIN]swaggerObject');
  console.log(swaggerObject);
});

adminAPIInstance.on('finish', swaggerObject => {
  console.log('[ADMIN]Finish');
  console.log(swaggerObject);
});

app.listen(port, () => logger.info(`Example app listening at http://localhost:${port}`));