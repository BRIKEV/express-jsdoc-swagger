const express = require('express');

const expressJSDocSwagger = require('../..');

const options = {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Swagger Petstore',
    license: {
      name: 'MIT',
    },
  },
  paths: {},
};

const app = express();
const port = 3000;

const generator = expressJSDocSwagger(app);

generator(options);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
