const swaggerUi = require('swagger-ui-express');
const merge = require('merge');

const defaultOptions = require('./config/default');
const swaggerEventsOptions = require('./config/swaggerEvents');
const processSwagger = require('./processSwagger');
const swaggerEvents = require('./swaggerEvents');

const expressJSDocSwagger = app => (userOptions = {}, userSwagger = {}) => {
  const events = swaggerEvents(swaggerEventsOptions(userOptions));
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
        ...result.swaggerObject,
      };
      swaggerObject = merge.recursive(true, swaggerObject, userSwagger);
      events.finish(swaggerObject, {
        jsdocInfo: result.jsdocInfo,
        getPaths: result.getPaths,
        getComponents: result.getComponents,
        getTags: result.getTags,
      });
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
      res.json({
        ...swaggerObject,
        // we skipped this as is not a valid prop in OpenAPI
        // This is only being used in the SwaggerUI Library
        host: undefined,
      });
    });
  }

  return instance;
};

module.exports = expressJSDocSwagger;
