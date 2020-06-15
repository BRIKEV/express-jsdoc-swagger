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
  filesPattern: './multiple.js',
  baseDir: __dirname,
};

const app = express();
const port = 3000;

expressJSDocSwagger(app)(options);

// This one includes a mix of params and requestBody

/**
 * POST /api/v1/album
 * @param {number} body.query
 * @param {array<string>} request.body.required - name body description
 * @return {object} 200 - album response
 */
app.post('/api/v1/album', (req, res) => res.send('Hello World!'));

app.listen(port, () => logger.info(`Example app listening at http://localhost:${port}`));
