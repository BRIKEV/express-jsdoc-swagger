const debug = require('debug')('express-jsdoc-swagger:processSwagger');
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

const processSwagger = options => {
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

  return globFilesMatches(options.baseDir, options.file)
    .then(readFiles)
    .then(getOnlyComments)
    .then(jsdocInfo())
    .then(data => {
      swaggerObject = getPaths(swaggerObject, data);
      swaggerObject = getComponents(swaggerObject, data);
      swaggerObject = getTags(swaggerObject, data);
      return swaggerObject;
    });
};

module.exports = processSwagger;
