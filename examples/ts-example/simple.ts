import express from 'express';
import expressJSDocSwagger from 'express-jsdoc-swagger';

const port = 3000;
// Create a new express app instance
const app: express.Application = express();

const options = {
  info: {
    version: '1.0.0',
    title: 'Albums store',
    license: {
      name: 'MIT',
      url: 'http://example.com',
    },
    description: 'API desctiption',
    contact: {
      name: 'contact name',
      url: 'http://example.com',
      email: 'test@test.com',
    },
    termsOfService: 'http://example.com',
  },
  servers: [
    {
      url: 'https://{username}.gigantic-server.com:{port}/{basePath}',
      description: 'The production API server',
      variables: {
        username: {
          default: 'demo',
          description: 'this value is assigned by the service provider, in this example `gigantic-server.com`',
        },
        port: {
          enum: [
            '8443',
            '443',
          ],
          default: '8443',
        },
        basePath: {
          default: 'v2',
        },
      },
    },
  ],
  security: {
    BasicAuth: {
      type: 'http',
      scheme: 'basic',
    },
  },
  filesPattern: './simple.{ts,js}',
  baseDir: __dirname,
};


expressJSDocSwagger(app)(options);
/**
 * GET /api/v1
 * @summary This is the summary of the endpoint
 * @return {string} 200 - success response
 */
app.get('/api/v1', (_req, res) => {
  res.send('Hello World!');
});

/**
 * POST /tag
 *
 * @summary create a tag
 * @param {string} name the name fo the new tag
 * @returns {object} 200 - success response
 * @returns {object} 400 - Bad request response
 * @example response - 200 - success response example
 *   {
 *     "_id": "Bury the light",
 *     "name": "lorem ipsum",
 *   }
 */
app.listen(port, () => {
  console.log('App is listening on port 3000!');
});

