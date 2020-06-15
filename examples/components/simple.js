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
  filesPattern: './simple.js',
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
 * Author model
 * @typedef {object} Author
 * @property {string} name.required - Author name
 * @property {number} age - Author age - double
 */

/**
 * Album
 * @typedef {object} Album
 * @property {Song} firstSong
 * @property {Author} author
 */

/**
 * Album
 * @typedef {object} Album
 * @property {string} title - The title
 * @property {array<number>} years
 */

/**
 * Album
 * @typedef {object} Album
 * @property {array<Song>} Songs
 */

app.listen(port, () => logger.info(`Example app listening at http://localhost:${port}`));
