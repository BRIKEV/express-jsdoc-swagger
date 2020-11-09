import express from 'express';
import expressJSDocSwagger from '../../';

const port = 3000;
// Create a new express app instance
const app: express.Application = express();

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

expressJSDocSwagger(app)(options);
/**
 * GET /api/v1
 * @summary This is the summary or description of the endpoint
 * @return {string} 200 - success response
 */
app.get('/api/v1', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log('App is listening on port 3000!');
});

