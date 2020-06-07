const swaggerUi = require('swagger-ui-express');
const swaggerEvents = require('./swaggerEvents');

const processSwagger = require('./processSwagger');

let instance = null;

const expressJSDocSwagger = app => {
  if (instance) return () => instance;
  return options => {
    const events = swaggerEvents();
    instance = events.instance;
    let swaggerObject = {};

    processSwagger(options, events.processFile)
      .then(result => {
        swaggerObject = {
          ...swaggerObject,
          ...result,
        };
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
