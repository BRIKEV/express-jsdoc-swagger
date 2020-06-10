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
  filesPattern: './simple.js',
  baseDir: __dirname,
};

const app = express();
const port = 3000;

expressJSDocSwagger(app)(options);

/**
 * POST /api/v1
 * @param {string} request.body.required - name body description
 */
app.post('/api/v1', (req, res) => res.send('Hello World!'));

/**
 * POST /api/v1/albums
 * @param {array<object>} request.body.required
 */
app.post('/api/v1', (req, res) => res.send('Hello World!'));

app.listen(port, () => logger.info(`Example app listening at http://localhost:${port}`));
