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
  },
  filesPattern: './basic-auth.js',
  baseDir: __dirname,
};

const app = express();
const port = 3000;

expressJSDocSwagger(app)(options);

/**
 * GET /api/v1
 * @summary This is the summary or description of the endpoint
 * @return {string} 200 - success response
 */
app.get('/api/v1', (req, res) => res.send('Hello World!'));

app.listen(port, () => logger.info(`Example app listening at http://localhost:${port}`));
