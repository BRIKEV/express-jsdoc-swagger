const swaggerUi = require('swagger-ui-express');
const debug = require('debug')('express-jsdoc-swagger');
const swaggerEvents = require('./swaggerEvents');

const processSwagger = require('./processSwagger');

let instance = null;

const expressJSDocSwagger = app => {
  if (instance) return () => instance;
  return options => {
    instance = swaggerEvents();
    debug(`Retrieving ${JSON.stringify(options)}`);
    let swaggerObject = {};

    processSwagger(options)
      .then(result => {
        swaggerObject = {
          ...swaggerObject,
          ...result,
        };
        instance.processFile(swaggerObject);
        instance.finish(swaggerObject);
      })
      .catch(instance.error);

    app.use('/api-docs', (req, res, next) => {
      debug(`Render express endpoint with SwaggerObject: ${JSON.stringify(swaggerObject)}`);
      swaggerObject = {
        ...swaggerObject,
        host: req.get('host'),
      };
      req.swaggerDoc = swaggerObject;
      next();
    }, swaggerUi.serve, swaggerUi.setup());

    return instance;
  };
};

module.exports = expressJSDocSwagger;
