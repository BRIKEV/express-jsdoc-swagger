const debug = require('debug')('express-jsdoc-swagger:transforms:paths');
const responsesGenerator = require('./responses');
const parametersGenerator = require('./parameters');

const getTagInfo = (tags, key) => tags.find(({ title }) => title === key);

const getTagsInfo = (tags, key) => tags.filter(({ title }) => title === key);

const parsePath = path => {
  debug(`Transforms path: ${JSON.stringify(path)}`);
  if (!path.description || !path.tags) return {};
  const [method, endpoint] = path.description.split(' ');
  // if jsdoc comment des not contain structure <Method> - <Endpoint> is not valid path
  if (!method) return {};
  const lowerCaseMethod = method.toLowerCase();
  const { tags } = path;
  const summary = getTagInfo(tags, 'summary');
  const returnValues = getTagsInfo(tags, 'return');
  const paramValues = getTagsInfo(tags, 'param');
  const responses = responsesGenerator(returnValues);
  const parameters = parametersGenerator(paramValues);
  return {
    [endpoint]: {
      [lowerCaseMethod]: {
        summary: summary && summary.description ? summary.description : '',
        responses,
        parameters,
      },
    },
  };
};

const parsePaths = (swaggerObject = {}, paths = []) => {
  if (!paths || !Array.isArray(paths)) return { paths: {} };
  const pathObject = paths.reduce((acum, item) => {
    const newPaths = { ...parsePath(item) };
    return newPaths;
  }, {});
  return {
    ...swaggerObject,
    paths: pathObject,
  };
};

module.exports = parsePaths;
