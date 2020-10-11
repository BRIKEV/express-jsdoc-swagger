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
  filesPattern: './withExample.js',
  baseDir: __dirname,
};

const app = express();
const port = 3000;

expressJSDocSwagger(app)(options);

/**
 * A song
 * @typedef {object} Song
 * @property {string} title.required - The title
 * @property {string} artist - The artist
 * @property {integer} year - The year - int64
 */

/**
 * POST /api/v1/song
 * @param {Song} request.body.required - song info
 * @return {object} 200 - song response
 * @return {object} 400 - Bad request response
 * @example request - example payload
 * {
 *   "title": "untitled song",
 *   "artist": "anonymous",
 *   "year": 2019
 * }
 * @example response - 200 - example success response
 * {
 *   "message": "you have saved song"
 * }
 * @example response - 400 - example error response
 * {
 *   "message": "failed to save song",
 *   "errCode": "E120"
 * }
 */
app.post('/api/v1/songs', (req, res) => res.send('You save a song!'));

app.listen(port, () => logger.info(`Example app listening at http://localhost:${port}`));
