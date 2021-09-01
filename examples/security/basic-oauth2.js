const express = require('express');
const oauthDetails = require('./swagger');

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
    oAuthSample: [
      'write_pets',
      'read_pets',
    ]
  },
  filesPattern: './basic-oauth2.js',
  baseDir: __dirname,
};

const app = express();
const port = 3000;

expressJSDocSwagger(app)(options, oauthDetails);

/**
 * GET /api/v1/oauth
 * @summary Endpoint with security info
 * @return {string} 200 - success response
 * @security oAuthSample
 */
 app.get('/api/v1', (req, res) => res.send('Hello World!'));

app.listen(port, () => logger.info(`Example app listening at http://localhost:${port}`));
