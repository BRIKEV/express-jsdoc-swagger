const swaggerUi = require('swagger-ui-express');
const merge = require('merge');

const defaultOptions = require('./config/default');
const processSwagger = require('./processSwagger');
const swaggerEvents = require('./swaggerEvents');

const expressJSDocSwagger = app => (userOptions = {}, userSwagger = {}) => {
  const events = swaggerEvents();
  const { instance } = events;
  let swaggerObject = {};

  const options = {
    ...defaultOptions,
    ...userOptions,
  };

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

  if (options.exposeSwaggerUI) {
    app.use(options.swaggerUIPath, (req, res, next) => {
      swaggerObject = {
        ...swaggerObject,
        host: req.get('host'),
      };
      req.swaggerDoc = swaggerObject;
      next();
    }, swaggerUi.serve, swaggerUi.setup(undefined, options.swaggerUiOptions));
  }

  if (options.exposeApiDocs) {
    app.get(options.apiDocsPath, (req, res) => {
      res.json(swaggerObject);
    });
  }

  return instance;
};

module.exports = expressJSDocSwagger;
