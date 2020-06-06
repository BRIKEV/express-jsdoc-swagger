const swaggerUi = require('swagger-ui-express');
const debug = require('debug')('express-jsdoc-swagger');
const processSwagger = require('./processSwagger');

const expressJSDocSwagger = app => (
  options => {
    debug(`Retrieving ${JSON.stringify(options)}`);
    let swaggerObject = {};

    processSwagger(options)
      .then(result => {
        swaggerObject = {
          ...swaggerObject,
          ...result,
        };
      });

    app.use('/api-docs', (req, res, next) => {
      debug(`Render express endpoint with SwaggerObject: ${JSON.stringify(swaggerObject)}`);
      swaggerObject = {
        ...swaggerObject,
        host: req.get('host'),
      };
      req.swaggerDoc = swaggerObject;
      next();
    }, swaggerUi.serve, swaggerUi.setup());

    return swaggerObject;
  }
);

module.exports = expressJSDocSwagger;
