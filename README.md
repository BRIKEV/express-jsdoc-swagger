![npm](https://img.shields.io/npm/v/express-jsdoc-swagger)
![Node.js Package](https://github.com/BRIKEV/express-jsdoc-swagger/workflows/Build/badge.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/BRIKEV/express-jsdoc-swagger/badge.svg)](https://snyk.io/test/github/BRIKEV/express-jsdoc-swagger)
[![Maintainability](https://api.codeclimate.com/v1/badges/6d5565df0c9c10e75b59/maintainability)](https://codeclimate.com/github/BRIKEV/express-jsdoc-swagger/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6d5565df0c9c10e75b59/test_coverage)](https://codeclimate.com/github/BRIKEV/express-jsdoc-swagger/test_coverage)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![npm](https://img.shields.io/npm/dm/express-jsdoc-swagger)

# express-jsdoc-swagger

With this library, you can document your express endpoints using swagger [OpenAPI 3 Specification](https://swagger.io/specification/) without writing YAML or JSON. You can write jsdoc comments on each endpoint, and the library is going to create the swagger UI.

## Prerequisites
This library assumes you are using:
1. [NodeJS](https://nodejs.org)
2. [Express.js](http://www.expressjs.com)

## Installation
```
npm i express-jsdoc-swagger
```

## Usage
```javascript
const express = require('express');
const expressJSDocSwagger = require('express-jsdoc-swagger');

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
  filesPattern: './**/*.js', // Glob pattern to find your jsdoc files (it supports arrays too ['./**/*.controller.js', './**/*.route.js'])
  swaggerUIPath: '/your-url', // SwaggerUI will be render in this url. Default: '/api-docs'
  baseDir: __dirname,
  exposeSwaggerUI: true, // Expose OpenAPI UI. Default true
  exposeApiDocs: false, // Expose Open API JSON Docs documentation in `apiDocsPath` path. Default false.
  apiDocsPath: '/v3/api-docs', // Open API JSON Docs endpoint. Default value '/v3/api-docs'.
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

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));

```

## Examples
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
  filesPattern: './**/*.js', // Glob pattern to find your jsdoc files
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
 * @property {number} year - The year - double
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

5. Basic endpoint definition with code example for response body
```javascript
/**
 * GET /api/v1/albums
 * @summary This is the summary or description of the endpoint
 * @tags album
 * @return {array<Song>} 200 - success response - application/json
 * @example response - 200 - success response example
 * [
 *   {
 *     "title": "Bury the light",
 *     "artist": "Casey Edwards ft. Victor Borba",
 *     "year": 2020
 *   }
 * ]
 */
app.get('/api/v1/albums', (req, res) => (
  res.json([{
    title: 'track 1',
  }])
));
```

You can find more examples [here](https://github.com/BRIKEV/express-jsdoc-swagger/tree/master/examples), or visit our [documentation](https://brikev.github.io/express-jsdoc-swagger-docs/#/).

## Contributors ✨

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/bri06"><img src="https://avatars0.githubusercontent.com/u/24435223?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Briam Martinez Escobar</b></sub></a><br /><a href="https://github.com/BRIKEV/express-jsdoc-swagger/commits?author=bri06" title="Code">💻</a></td>
    <td align="center"><a href="https://twitter.com/kjmesc"><img src="https://avatars2.githubusercontent.com/u/12685053?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kevin Julián Martínez Escobar</b></sub></a><br /><a href="https://github.com/BRIKEV/express-jsdoc-swagger/commits?author=kevinccbsg" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/hoonga"><img src="https://avatars3.githubusercontent.com/u/10708927?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Heung-yeon Oh</b></sub></a><br /><a href="https://github.com/BRIKEV/express-jsdoc-swagger/commits?author=hoonga" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/LonelyPrincess"><img src="https://avatars1.githubusercontent.com/u/17673317?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sara Hernández</b></sub></a><br /><a href="https://github.com/BRIKEV/express-jsdoc-swagger/commits?author=LonelyPrincess" title="Code">💻</a></td>
    <td align="center"><a href="http://servatj.me"><img src="https://avatars0.githubusercontent.com/u/3521485?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Josep Servat</b></sub></a><br /><a href="https://github.com/BRIKEV/express-jsdoc-swagger/commits?author=servatj" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/thuydx55"><img src="https://avatars2.githubusercontent.com/u/1469984?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nick Dong</b></sub></a><br /><a href="https://github.com/BRIKEV/express-jsdoc-swagger/commits?author=thuydx55" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Stosiu"><img src="https://avatars1.githubusercontent.com/u/10252063?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Aleksander Stós</b></sub></a><br /><a href="https://github.com/BRIKEV/express-jsdoc-swagger/commits?author=Stosiu" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/kdankert"><img src="https://avatars0.githubusercontent.com/u/46489624?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kjell Dankert</b></sub></a><br /><a href="https://github.com/BRIKEV/express-jsdoc-swagger/commits?author=kdankert" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/juliendu11"><img src="https://avatars0.githubusercontent.com/u/18739442?v=4?s=100" width="100px;" alt=""/><br /><sub><b>juliendu11</b></sub></a><br /><a href="https://github.com/BRIKEV/express-jsdoc-swagger/commits?author=juliendu11" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
