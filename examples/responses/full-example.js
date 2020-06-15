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
  filesPattern: './full-example.js',
  baseDir: __dirname,
  security: {
    BasicAuth: {
      type: 'http',
      scheme: 'basic',
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
 * @property {array<number>} year
 */

/**
 * GET /api/v2/album
 * @summary This is the summary or description of the endpoint
 * @tags album
 * @security BasicAuth
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
app.get('/api/v2/album', (req, res) => (
  res.json({
    title: 'abum 1',
  })
));

/**
 * GET /api/v1/album
 * @summary This is the summary or description of the endpoint
 * @tags album
 * @deprecated
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
app.get('/api/v1/album', (req, res) => (
  res.json({
    title: 'abum 1',
  })
));

/**
 * GET /api/v1/albums
 * @summary This is the summary or description of the endpoint
 * @tags album
 * @return {array<Song>} 200 - success response - application/json
 */
app.get('/api/v1/albums', (req, res) => (
  res.json([{
    title: 'abum 1',
  }])
));

app.listen(port, () => logger.info(`Example app listening at http://localhost:${port}`));
