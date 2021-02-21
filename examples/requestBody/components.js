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

const listener = expressJSDocSwagger(app)(options);

listener.on('finish', swaggerObject => {
  logger.info('Finish');
  console.log(JSON.stringify(swaggerObject, null, 2));
});

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
 */
app.post('/api/v1/songs', (req, res) => res.send('You save a song!'));

/**
 * POST /api/v1/album
 * @param {array<Song>} request.body.required - songs info
 * @return {object} 200 - album response
 */
app.post('/api/v1/album', (req, res) => res.send('You save a song!'));


app.listen(port, () => logger.info(`Example app listening at http://localhost:${port}`));
