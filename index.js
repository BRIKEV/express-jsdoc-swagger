const swaggerUi = require('swagger-ui-express');
const merge = require('merge');
const processSwagger = require('./processSwagger');
const swaggerEvents = require('./swaggerEvents');

let instance = null;

const expressJSDocSwagger = app => {
  if (instance) return () => instance;
  return (options, userSwagger = {}) => {
    const events = swaggerEvents();
    instance = events.instance;
    let swaggerObject = {};

    processSwagger(options, events.processFile)
      .then(result => {
        swaggerObject = {
          ...swaggerObject,
          ...result,
        };
        swaggerObject = merge.recursive(true, swaggerObject, userSwagger);
        events.finish(swaggerObject);
      })
      .catch(events.error);

    app.use('/api-docs', (req, res, next) => {
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
