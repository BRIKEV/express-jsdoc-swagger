const express = require('express');

const logger = require('../utils/logger');
const expressJSDocSwagger = require('../..');

// This is a full set of options
// It is not neccesary to complete every option
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
  servers: [],
  filesPattern: './main.js',
  baseDir: __dirname,
  swaggerUiOptions: {
    swaggerOptions: {
      // This one removes the modals spec
      // You can checkout more config info here: https://github.com/swagger-api/swagger-ui/blob/master/docs/usage/configuration.md
      defaultModelsExpandDepth: -1,
    },
  },
};

const app = express();
const port = 3000;

expressJSDocSwagger(app)(options);

/**
 * A song type
 * @typedef {object} Song
 * @property {string} title.required - The title
 * @property {string} artist - The artist
 * @property {integer} year - The year - int64
 */

/**
 * GET /api/v1/albums
 * @summary This is the summary of the endpoint
 * @return {array<Song>} 200 - success response - application/json
 */
app.get('/api/v1/albums', (req, res) => res.json([]));

app.listen(port, () => logger.info(`Example app listening at http://localhost:${port}`));
