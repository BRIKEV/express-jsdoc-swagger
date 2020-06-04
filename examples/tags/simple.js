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
  file: './simple.js',
  baseDir: __dirname,
};

const app = express();
const port = 3000;

expressJSDocSwagger(app)(options);

/**
 * GET /api/v1/album
 * @tags Album
 */

/**
 * GET /api/v1/songs
 * @tags Album
 * @tags Songs
 */

/**
 * POST /api/v1/song
 * @summary Create new song
 * @tags Songs - everything about songs
 */

/**
 * PUT /api/v1/song/{songId}
 * @param {number} songId.path.required - song id
 * @summary Edit song
 * @tags Songs
 */

/**
 * DELETE /api/v1/song/{songId}
 * @param {number} songId.path.required - song id
 * @summary Delete song
 * @tags Songs
 */

/**
 * GET /api/v1/song/{songId}
 * @param {number} songId.path.required - song id
 * @summary Get song detail
 * @tags Songs
 */

app.listen(port, () => logger.info(`Example app listening at http://localhost:${port}`));
