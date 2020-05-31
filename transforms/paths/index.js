const debug = require('debug')('express-jsdoc-swagger:transforms:paths');
const responsesGenerator = require('./responses');
const parametersGenerator = require('./parameters');
const requestBody = require('./requestBody');
const { getTagInfo, getTagsInfo } = require('../utils/tags');
const validBodyMethods = require('./validRequestBodyMethods');

const formatTags = (tags = []) => tags.map(({ description: name }) => name);

const parsePath = (path, state) => {
  debug(`Transforms path: ${JSON.stringify(path)}`);
  if (!path.description || !path.tags) return {};
  const [method, endpoint] = path.description.split(' ');
  // if jsdoc comment des not contain structure <Method> - <Endpoint> is not valid path
  if (!method) return {};
  const lowerCaseMethod = method.toLowerCase();
  const { tags } = path;
  const summary = getTagInfo(tags, 'summary');
  const deprecated = getTagInfo(tags, 'deprecated');
  const isDeprecated = !!deprecated;
  const returnValues = getTagsInfo(tags, 'return');
  const paramValues = getTagsInfo(tags, 'param');
  const tagsValues = getTagsInfo(tags, 'tags');
  const responses = responsesGenerator(returnValues);
  const parameters = parametersGenerator(paramValues);
  return {
    ...state,
    [endpoint]: {
      ...state[endpoint],
      [lowerCaseMethod]: {
        deprecated: isDeprecated,
        summary: summary && summary.description ? summary.description : '',
        responses,
        parameters,
        tags: formatTags(tagsValues),
        ...(validBodyMethods[lowerCaseMethod] ? { requestBody: requestBody(paramValues) } : {}),
      },
    },
  };
};

const parsePaths = (swaggerObject = {}, paths = []) => {
  if (!paths || !Array.isArray(paths)) return { paths: {} };
  const pathObject = paths.reduce((acum, item) => ({
    ...acum, ...parsePath(item, acum),
  }), {});
  return {
    ...swaggerObject,
    paths: pathObject,
  };
};

module.exports = parsePaths;
