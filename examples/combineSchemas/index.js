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
  filesPattern: './index.js',
  baseDir: __dirname,
};

const app = express();
const port = 3000;

expressJSDocSwagger(app)(options);

/**
 * A song
 * @typedef {object} IntrumentalSong
 * @property {string} title.required - The title
 * @property {string} band - The band
 * @property {number} year - The year - double
 */

/**
 * A song
 * @typedef {object} PopSong
 * @property {string} title.required - The title
 * @property {string} artist - The artist
 * @property {integer} year - The year - int64
 */

/**
 * GET /api/v1/song/{id}
 * @summary This is the summary of the endpoint
 * @tags album
 * @param {number} id.path - song id
 * @return {oneOf|IntrumentalSong|PopSong} 200 - success response - application/json
 */
app.get('/api/v1/song/:id', (_req, res) => (
  res.json({
    title: 'abum 1',
  })
));

app.listen(port, () => logger.info(`Example app listening at http://localhost:${port}`));
