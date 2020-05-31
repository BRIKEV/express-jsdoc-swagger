const express = require('express');

const expressJSDocSwagger = require('../..');

const options = {
  info: {
    version: '1.0.0',
    title: 'Albums store',
    license: {
      name: 'MIT',
    },
  },
  file: './**/**.js',
  baseDir: __dirname,
};

const app = express();
const port = 3000;

const generator = expressJSDocSwagger(app);

generator(options);

/**
 * GET /api/v1/albums
 * @summary This is the summary or description of the endpoint
 * @return {object} 200 - success response - application/json
 */
app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
