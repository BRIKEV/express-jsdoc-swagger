const doctrine = require('doctrine');

const jsdocInfo = (options = { unwrap: true }) => comments => {
  if (!comments || !Array.isArray(comments)) return [];
  const parsed = comments.map(comment => {
    const parsedValue = doctrine.parse(comment, options);
    return {
      ...parsedValue,
      description: parsedValue.description.replace('/**\n', ''),
    };
  });
  return parsed;
};

module.exports = jsdocInfo;
