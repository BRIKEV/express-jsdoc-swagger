const express = require('express');

const logger = require('../utils/logger');
const expressJSDocSwagger = require('../..');

const options = {
  info: {
    version: '1.0.0',
    title: 'Albums store',
    license: {
      name: 'MIT',
    },
  },
  security: {
    BasicAuth: {
      type: 'http',
      scheme: 'basic',
    },
    BearerAuth: {
      type: 'http',
      scheme: 'bearer',
    },
  },
  filesPattern: './basic-auth.js',
  baseDir: __dirname,
};

const app = express();
const port = 3000;

expressJSDocSwagger(app)(options);

/**
 * GET /api/v1
 * @summary Endpoint with security info
 * @return {string} 200 - success response
 * @security BasicAuth
 */
app.get('/api/v1', (_req, res) => res.send('Hello World!'));

/**
 * GET /api/v2
 * @summary Endpoint with multiple security configuration (AND logic)
 * @return {string} 200 - success response
 * @security BasicAuth & BearerAuth
 */
app.get('/api/v2', (_req, res) => res.send('Hello World!'));

/**
 * GET /api/v3
 * @summary Endpoint with multiple security configuration (OR logic)
 * @return {string} 200 - success response
 * @security BasicAuth | BearerAuth
 */
app.get('/api/v3', (_req, res) => res.send('Hello World!'));

app.listen(port, () => logger.info(`Example app listening at http://localhost:${port}`));
