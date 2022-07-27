const doctrine = require('doctrine');

const jsdocInfo = (options = { unwrap: true }) => comments => {
  if (!comments || !Array.isArray(comments)) return [];
  return comments.map(comment => {
    const parsedValue = doctrine.parse(comment, options);
    const tags = parsedValue.tags.map(tag => ({
      ...tag,
      description: tag.description ? tag.description.replace('\n/', '').replace(/\/$/, '') : tag.description,
    }));
    const description = parsedValue.description.replace('/**\n', '').replace('\n/', '');
    return {
      ...parsedValue,
      tags,
      description,
    };
  });
};

module.exports = jsdocInfo;
