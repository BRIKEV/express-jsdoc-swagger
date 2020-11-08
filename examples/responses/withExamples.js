const express = require('express');

const logger = require('../utils/logger');
const expressJSDocSwagger = require('../..');

const options = {
  info: {
    version: '1.0.0',
    title: 'Pet store',
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
 * A pet
 * @typedef {object} Pet
 * @property {string} name.required - The name
 * @property {string} type.required - The type of pet
 * @property {string} breed - The breed
 */

/**
 * GET /api/v1/pet
 * @return {array<Pet>} 200 - success response
 * @return {object} 403 - forbidden request response
 * @example response - 200 - example success response
 * [
 *   {
 *     "name": "Blaze",
 *     "type": "Dog"
 *     "breed": "Siberian husky"
 *   },
 *   {
 *     "name": "Luna",
 *     "type": "Cat"
 *   }
 * ]
 * @example response - 200 - second example success response
 * [
 *   {
 *     "name": "Hachiko",
 *     "type": "Dog"
 *     "breed": "Akita Inu"
 *   },
 * ]
 * @example response - 403 - example error response
 * {
 *   "message": "you cannot access pet data",
 * }
 */
app.get('/api/v1/pet', (req, res) => (
  res.json([{
    name: 'Hachiko',
    type: 'Dog',
    breed: 'Akita Inu'
  }])
));

app.listen(port, () => logger.info(`Example app listening at http://localhost:${port}`));
