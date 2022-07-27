const express = require('express');
const expressJSDocSwagger = require('../..');
const validator = require('./validator');

const options = {
  info: {
    version: '1.0.0',
    title: 'Albums store',
    license: {
      name: 'MIT',
    },
  },
  filesPattern: './**.js',
  baseDir: __dirname,
};

const app = express();
const instance = expressJSDocSwagger(app)(options);

const serverApp = async () => {
  const { validateRequest, validateResponse } = await validator(instance);
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  /**
   * A song
   * @typedef {object} Song
   * @property {string} title.required - The title
   * @property {string} artist - The artist
   * @property {integer} year - The year
   */

  /**
   * POST /api/v1/songs
   * @param {Song} request.body.required - song info
   * @return {object} 200 - song response
   */
  app.post('/api/v1/songs', validateRequest(), (req, res) => res.send('You save a song!'));

  /**
   * POST /api/v1/name
   * @param {string} request.body.required - name body description
   * @return {object} 200 - song response
   */
  app.post('/api/v1/name', (req, res, next) => {
    try {
      // Validate response
      validateResponse('Error string', req);
      return res.send('Hello World!');
    } catch (error) {
      return next(error);
    }
  });

  /**
   * GET /api/v1/authors
   * @summary This is the summary or description of the endpoint
   * @param {string} name.query.required - name param description - enum:type1,type2
   * @param {array<string>} license.query - name param description
   * @return {object} 200 - success response - application/json
   */
  app.get('/api/v1/authors', validateRequest({ headers: false }), (req, res) => (
    res.json([{
      title: 'album 1',
    }])
  ));


  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    res.status(err.status).json(err);
  });

  return app;
};

module.exports = serverApp;
