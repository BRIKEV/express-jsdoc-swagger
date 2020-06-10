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

const listener = expressJSDocSwagger(app)(options);

// Event emitter API
listener.on('error', error => {
  logger.error(`Error: ${error}`);
});

listener.on('process', ({ entity, swaggerObject }) => {
  logger.info(`entity: ${entity}`);
  logger.info('swaggerObject');
  logger.info(swaggerObject);
});

listener.on('finish', swaggerObject => {
  logger.info('Finish');
  logger.info(swaggerObject);
});

app.listen(port, () => logger.info(`Example app listening at http://localhost:${port}`));
