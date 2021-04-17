const express = require('express');

const logger = require('../utils/logger');
const expressJSDocSwagger = require('../..');

const options = {
  info: {
    version: '1.0.0',
    title: 'Albums store',
    description: 'Example where non-required fields are nullable by default',
    license: {
      name: 'MIT',
    },
  },
  filesPattern: './index.js',
  baseDir: __dirname,
  notRequiredAsNullable: true,
};

const app = express();
const port = 3000;

expressJSDocSwagger(app)(options);

/**
 * @typedef {object} Song
 * @property {number} id.required - Id
 * @property {string} title.required - The title
 * @property {string} artist - The artist
 * @property {integer} year - The year - int64
 */

/**
 * POST /api/v1/songs
 * @summary Adds a new song
 * @param {Song} request.body.required - Song to add
 * @return {string} 200 - Success message
 */
app.post('/api/v1/songs', (req, res) => res.send('You saved a song!'));

app.listen(port, () => logger.info(`Example app listening at http://localhost:${port}`));
