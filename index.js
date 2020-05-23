const swaggerUi = require('swagger-ui-express');
const readFiles = require('./consumers/readFiles');
const globFilesMatches = require('./consumers/globFilesMatches');
const getOnlyComments = require('./consumers/getOnlyComments');
const jsdocInfo = require('./consumers/jsdocInfo');
const { getBasicInfo } = require('./transforms');

/**
 * Generator options
 * @typedef {Object} Options
 * @property {string} title - The title
 */

/**
 * @param  {instance} Express instance
 * @return {function} A constructor of expressJSDocSwagger
 */
const expressJSDocSwagger = app => {
  /**
   * @param  {object} options - Generator options
   * @return {object} swaggerInfo - Swagger compiled options
   */
  return options => {
    let swaggerObject = {
      openapi: options.openapi,
      info: options.info,
      paths: options.paths,
    };

    globFilesMatches(options.baseDir, options.file)
      .then(readFiles)
      .then(getOnlyComments)
      .then(jsdocInfo())
      .then(data => console.log(JSON.stringify(data)))
      .catch(err => console.log(err));

    swaggerObject = getBasicInfo(swaggerObject);

    app.use('/api-docs', (req, res, next) => {
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
