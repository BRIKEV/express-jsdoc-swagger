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

/**
 * GET /api/v1/{id}
 * @summary This is the summary of the endpoint
 * @param {string} name.query.required - name param description
 * @param {number} id.path - phone number
 * @return {string} 200 - success response
 */
app.get('/api/v1/:id', (req, res) => res.send('Hello World!'));

/**
 * GET /api/v1/albums/{id}
 * @summary This is the summary of the endpoint
 * @param {array<string>} name.query.required.deprecated - name param description
 * @param {number} id.path
 * @return {object} 200 - success response - application/json
 */
app.get('/api/v1/albums/:id', (req, res) => (
  res.json([{
    title: 'abum 1',
  }])
));

app.listen(port, () => logger.info(`Example app listening at http://localhost:${port}`));
