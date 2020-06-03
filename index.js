const swaggerUi = require('swagger-ui-express');
const debug = require('debug')('express-jsdoc-swagger');

const readFiles = require('./consumers/readFiles');
const globFilesMatches = require('./consumers/globFilesMatches');
const getOnlyComments = require('./consumers/getOnlyComments');
const jsdocInfo = require('./consumers/jsdocInfo');
const {
  getBasicInfo,
  getSecuritySchemes,
  getPaths,
  getComponents,
  getTags,
} = require('./transforms');

/**
 * Generator options
 * @typedef {Object} Options
 * @property {string} title - The title
 */

/**
 * @param  {instance} Express instance
 * @return {function} A constructor of expressJSDocSwagger
 */
// eslint-disable-next-line
const expressJSDocSwagger = app => {
  /**
   * @param  {object} options - Generator options
   * @return {object} swaggerInfo - Swagger compiled options
   */
  return options => {
    debug(`Retrieving ${JSON.stringify(options)}`);
    let swaggerObject = {
      openapi: '3.0.0',
      info: options.info,
      servers: options.servers,
      security: options.security,
    };

    debug('Getting basic swagger info');
    swaggerObject = getBasicInfo(swaggerObject);
    swaggerObject = getSecuritySchemes(swaggerObject);
    debug(`SwaggerObject with basic info ${JSON.stringify(swaggerObject)}`);

    globFilesMatches(options.baseDir, options.file)
      .then(readFiles)
      .then(getOnlyComments)
      .then(jsdocInfo())
      .then(data => {
        swaggerObject = getPaths(swaggerObject, data);
        swaggerObject = getComponents(swaggerObject, data);
        swaggerObject = getTags(swaggerObject, data);
      })
      .catch(console.log);


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
  };
};

module.exports = expressJSDocSwagger;
