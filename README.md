![Node.js Package](https://github.com/BRIKEV/express-jsdoc-swagger/workflows/Build/badge.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/BRIKEV/express-jsdoc-swagger/badge.svg)](https://snyk.io/test/github/BRIKEV/express-jsdoc-swagger)
[![Maintainability](https://api.codeclimate.com/v1/badges/6d5565df0c9c10e75b59/maintainability)](https://codeclimate.com/github/BRIKEV/express-jsdoc-swagger/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6d5565df0c9c10e75b59/test_coverage)](https://codeclimate.com/github/BRIKEV/express-jsdoc-swagger/test_coverage)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

# express-jsdoc-swagger

With this library, you can document your endpoints using swagger [OpenAPI 3 Specification](https://swagger.io/specification/) without writing YAML or JSON. You just have to write comments on your endpoints and swagger UI will be automatically generated.

## Prerequisites
This library assumes you are using:
1. [NodeJS](https://nodejs.org)
2. [Express.js](http://www.expressjs.com)

## Usage
```javascript

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
  security: {
    BasicAuth: {
      type: 'http',
      scheme: 'basic',
    },
  },
  file: './**/*.js', // Glob pattern to find your jsdoc files
  swaggerUIPath: '/your-url', // SwaggerUI will be render in this url. Default: '/api-docs'
  baseDir: __dirname,
};

const app = express();
const PORT = 3000;

expressJSDocSwagger(app)(options);

/**
 * GET /api/v1
 * @summary This is the summary or description of the endpoint
 * @return {object} 200 - success response
 */
app.get('/api/v1', (req, res) => res.json({
  success: true,
}));

app.listen(PORT, () => logger.info(`Example app listening at http://localhost:${PORT}`));

```

### Examples
1. Basic configuration
```javascript
const options = {
  info: {
    version: '1.0.0',
    title: 'Albums store',
    license: {
      name: 'MIT',
    },
  },
  security: {
    BasicAuth: {
      type: 'http',
      scheme: 'basic',
    },
  },
  file: './**/*.js', // Glob pattern to find your jsdoc files
  baseDir: __dirname,
};
```

2. Components definition
```javascript
/**
 * A song type
 * @typedef {object} Song
 * @property {string} title.required - The title
 * @property {string} artist - The artist
 * @property {number} year - The year - int64
 */
```

3. Endpoint that returns a `Songs` model array
```javascript
/**
 * GET /api/v1/albums
 * @summary This is the summary or description of the endpoint
 * @tags album
 * @return {array<Song>} 200 - success response - application/json
 */
app.get('/api/v1/albums', (req, res) => (
  res.json([{
    title: 'abum 1',
  }])
));
```

4. Basic endpoint definition with tags, params and basic authentication
```javascript
/**
 * GET /api/v1/album
 * @summary This is the summary or description of the endpoint
 * @security BasicAuth
 * @tags album
 * @param {string} name.query.required - name param description
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
app.get('/api/v1/album', (req, res) => (
  res.json({
    title: 'abum 1',
  })
));
```

You can find more examples [here](https://github.com/BRIKEV/express-jsdoc-swagger/tree/master/examples), or visit our [documentation]() (WIP)

## Contributors ✨

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/bri06"><img src="https://avatars0.githubusercontent.com/u/24435223?v=4" width="100px;" alt=""/><br /><sub><b>Briam Martinez Escobar</b></sub></a><br /><a href="https://github.com/BRIKEV/express-jsdoc-swagger/commits?author=bri06" title="Code">💻</a></td>
    <td align="center"><a href="https://twitter.com/kjmesc"><img src="https://avatars2.githubusercontent.com/u/12685053?v=4" width="100px;" alt=""/><br /><sub><b>Kevin Julián Martínez Escobar</b></sub></a><br /><a href="https://github.com/BRIKEV/express-jsdoc-swagger/commits?author=kevinccbsg" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!