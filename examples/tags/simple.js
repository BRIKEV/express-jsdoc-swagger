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
 * GET /api/v1/album
 * @tags Album
 * @return {object} 200 - album response
 */

/**
 * GET /api/v1/songs
 * @tags Album
 * @tags Songs
 * @return {object} 200 - album response
 */

/**
 * POST /api/v1/song
 * @summary Create new song
 * @tags Songs - everything about songs
 * @return {object} 200 - album response
 */

/**
 * PUT /api/v1/song/{songId}
 * @param {number} songId.path.required - song id
 * @summary Edit song
 * @tags Songs
 * @return {object} 200 - album response
 */

/**
 * DELETE /api/v1/song/{songId}
 * @param {number} songId.path.required - song id
 * @summary Delete song
 * @tags Songs
 * @return {object} 200 - album response
 */

/**
 * GET /api/v1/song/{songId}
 * @param {number} songId.path.required - song id
 * @summary Get song detail
 * @tags Songs
 * @return {object} 200 - album response
 */

app.listen(port, () => logger.info(`Example app listening at http://localhost:${port}`));
