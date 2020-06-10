const express = require('express');
const userSwagger = require('./swagger');

const logger = require('../utils/logger');
const expressJSDocSwagger = require('../..');

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
    filesPattern: './simple.js',
    baseDir: __dirname,
};

const app = express();
const port = 3000;

expressJSDocSwagger(app)(options, userSwagger);

/**
 * GET /api/v1/albums
 * @summary This is the summary or description of the endpoint
 * @param {array<Song>} name.query.required - name param description
 * @return {array<Song>} 200 - success response - application/json
 */
app.get('/api/v1/albums', (req, res) => (
  res.json([{
    title: 'abum 1',
  }])
));

app.listen(port, () => logger.info(`Example app listening at http://localhost:${port}`));
