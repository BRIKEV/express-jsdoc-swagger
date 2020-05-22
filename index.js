const parser = require('swagger-parser');
const swaggerUi = require('swagger-ui-express');

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
    let swaggerObject = {};
    parser.parse(options, (err, api) => {
      if (!err) {
        swaggerObject = api;
      }
    });

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
