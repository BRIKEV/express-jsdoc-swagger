const debug = require('debug')('express-jsdoc-swagger:transforms:paths');

const getTagInfo = (tags, key) => tags.find(({ title }) => title === key);

const parsePath = path => {
  debug(`Transforms path: ${JSON.stringify(path)}`);
  if (!path.description || !path.tags) return {};
  const [method, endpoint] = path.description.split(' ');
  // if jsdoc comment des not contain structure <Method> - <Endpoint> is not valid path
  if (!method) return {};
  const lowerCaseMethod = method.toLowerCase();
  const { tags } = path;
  const summary = getTagInfo(tags, 'summary');
  const returnValue = getTagInfo(tags, 'return');
  const [status, responseDescription, contentType] = returnValue.description.split(' - ');
  // This replace is needed as doctrine leaves the last tag with this
  const cleanContentType = contentType.replace('\n/', '');
  return {
    [endpoint]: {
      [lowerCaseMethod]: {
        summary: summary.description || '',
        responses: {
          [status]: {
            description: responseDescription,
            content: {
              [cleanContentType]: {
                schema: {
                  type: returnValue.type.name,
                },
              },
            },
          },
        },
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
