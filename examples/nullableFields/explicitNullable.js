const express = require('express');

const logger = require('../utils/logger');
const expressJSDocSwagger = require('../..');

const options = {
  info: {
    version: '1.0.0',
    title: 'Albums store',
    description: 'Example where we define which specific properties are nullable',
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
 * @typedef {object} Song
 * @property {number} id.required - Id
 * @property {string} title.required - The title
 * @property {string} artist - The artist
 * @property {integer} year - The year - int64
 * @property {oneOf|string|null} album - The album to which the song belongs (if any)
 * @property {(string[]|null)} tags - Associate tags (if any)
 */

/**
 * POST /api/v1/songs
 * @summary Nullable props in request body
 * @param {Song} request.body.required - Song to add
 * @return {string} 200 - Success message
 */
 app.post('/api/v1/songs', (req, res) => res.send('You saved a song!'));

/**
 * GET /api/v1/song
 * @summary Nullable props in response
 * @return {array<Song>} 200 - List of songs
 */
app.get('/api/v1/song', (req, res) => res.json([
  {
    id: 1,
    title: 'Song from album',
    album: 'Collection',
  },
  {
    id: 2,
    title: 'Song with no album',
    album: null,
  },
]));

app.listen(port, () => logger.info(`Example app listening at http://localhost:${port}`));
