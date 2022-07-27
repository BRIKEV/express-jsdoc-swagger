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
  filesPattern: './components.js',
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
 * @property {string} createdAt - created - date
 */

/**
 * POST /api/v1/song
 * @param {Song} request.body.required - song info
 * @return {object} 200 - song response
 */
app.post('/api/v1/songs', (_req, res) => res.send('You save a song!'));

/**
 * POST /api/v1/album
 * @param {array<Song>} request.body.required - songs info
 * @return {object} 200 - album response
 */
app.post('/api/v1/album', (_req, res) => res.send('You save a song!'));


app.listen(port, () => logger.info(`Example app listening at http://localhost:${port}`));
