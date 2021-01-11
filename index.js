const swaggerUi = require('swagger-ui-express');
const merge = require('merge');
const processSwagger = require('./processSwagger');
const swaggerEvents = require('./swaggerEvents');

const DEFAULT_SWAGGERUI_URL = '/api-docs';
const DEFAULT_EXPOSE_SWAGGERUI = true;
const DEFAULT_APIDOCS_URL = '/v3/api-docs';
const DEFAULT_EXPOSE_APIDOCS = false;

const expressJSDocSwagger = app => (options = {}, userSwagger = {}) => {
  const events = swaggerEvents();
  const { instance } = events;
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

  if (options.exposeSwaggerUI || DEFAULT_EXPOSE_SWAGGERUI) {
    app.use(options.swaggerUIPath || DEFAULT_SWAGGERUI_URL, (req, res, next) => {
      swaggerObject = {
        ...swaggerObject,
        host: req.get('host'),
      };
      req.swaggerDoc = swaggerObject;
      next();
    }, swaggerUi.serve, swaggerUi.setup());
  }

  if (options.exposeApiDocs || DEFAULT_EXPOSE_APIDOCS) {
    app.get(options.apiDocsPath || DEFAULT_APIDOCS_URL, (req, res) => {
      res.json(swaggerObject);
    });
  }

  return instance;
};

module.exports = expressJSDocSwagger;
