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
  filesPattern: './withExamples.js',
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
 * @example request - payload example
 * {
 *   "title": "Bury The Light",
 *   "artist": "Casey Edwards ft. Victor Borba",
 *   "year": 2020
 * }
 * @example request - other payload example
 * {
 *   "title": "The war we made",
 *   "artist": "Red",
 *   "year": 2020
 * }
 */
app.post('/api/v1/song', (req, res) => res.send({
  message: 'You added a song!',
}));

app.listen(port, () => logger.info(`Example app listening at http://localhost:${port}`));
