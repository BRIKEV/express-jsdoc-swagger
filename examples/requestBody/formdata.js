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
  filesPattern: './formdata.js',
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
 * @property {string} cover - image cover - binary
 * @property {integer} year - The year - int64
 */

/**
 * POST /api/v1/album
 * @param {Song} request.body.required - songs info - multipart/form-data
 * @return {object} 200 - Album created
 */
app.post('/api/v1/album', (_req, res) => res.send('You save a song!'));


app.listen(port, () => logger.info(`Example app listening at http://localhost:${port}`));
