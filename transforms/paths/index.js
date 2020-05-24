const debug = require('debug')('express-jsdoc-swagger:transforms:paths');

const getTagInfo = (tags, key) => tags.find(({ title }) => title === key);

const getTagsInfo = (tags, key) => tags.filter(({ title }) => title === key);

const DEFAULT_CONTENT_TYPE = 'application/json';

const responsesGenerator = (returnValues = []) => {
  const mapDescription = description => (
    description.split(' - ').map(value => value.replace('\n/', ''))
  );
  if (!returnValues || !Array.isArray(returnValues)) return {};
  const response = returnValues.reduce((acc, value) => {
    const [status, responseDescription, contentType] = mapDescription(value.description);
    return {
      ...acc,
      [status]: {
        description: responseDescription,
        content: {
          [contentType || DEFAULT_CONTENT_TYPE]: {
            schema: {
              type: value.type.name,
            },
          },
        },
      },
    };
  }, {});
  return response;
};

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
  const responses = responsesGenerator(returnValues);
  return {
    [endpoint]: {
      [lowerCaseMethod]: {
        summary: summary.description || '',
        responses,
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
