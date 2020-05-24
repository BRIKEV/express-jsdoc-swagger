const doctrine = require('doctrine');

const jsdocInfo = (options = { unwrap: true }) => comments => {
  if (!comments || !Array.isArray(comments)) return [];
  const parsed = comments.map(comment => {
    const parsedValue = doctrine.parse(comment, options);
    const tags = parsedValue.tags.map(tag => ({
      ...tag,
      description: tag.description ? tag.description.replace('\n/', '').replace(/\/$/, '') : tag.description,
    }));
    return {
      ...parsedValue,
      tags,
      description: parsedValue.description.replace('/**\n', ''),
    };
  });
  return parsed;
};

module.exports = jsdocInfo;
