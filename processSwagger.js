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

const defaultLogger = () => null;

const processSwagger = (options, logger = defaultLogger) => {
  let swaggerObject = {
    openapi: '3.0.0',
    info: options.info,
    servers: options.servers,
    security: options.security,
  };

  swaggerObject = getBasicInfo(swaggerObject);
  logger({ entity: 'basicInfo', swaggerObject });
  swaggerObject = getSecuritySchemes(swaggerObject);
  logger({ entity: 'securitySchemas', swaggerObject });

  return globFilesMatches(options.baseDir, options.filesPattern)
    .then(readFiles)
    .then(getOnlyComments)
    .then(jsdocInfo())
    .then(data => {
      swaggerObject = getPaths(swaggerObject, data);
      logger({ entity: 'paths', swaggerObject });
      swaggerObject = getComponents(swaggerObject, data, options);
      logger({ entity: 'components', swaggerObject });
      swaggerObject = getTags(swaggerObject, data);
      logger({ entity: 'tags', swaggerObject });
      return {
        swaggerObject, jsdocInfo, getPaths, getComponents, getTags,
      };
    });
};

module.exports = processSwagger;
