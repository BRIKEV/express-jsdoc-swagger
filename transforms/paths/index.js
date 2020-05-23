
const getTagInfo = (tags, key) => tags.find(({ title }) => title === key);

const parsePath = path => {
  if (!path.description || !path.tags) return {};
  const [method, endpoint] = path.description.split(' ');
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

const parsePaths = (paths = []) => {
  if (!paths || !Array.isArray(paths)) return [];
  return paths.map(parsePath);
};

module.exports = parsePaths;
