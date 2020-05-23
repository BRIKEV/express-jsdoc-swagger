const doctrine = require('doctrine');

const jsdocInfo = (options = { unwrap: true }) => comments => {
  if (!comments || !Array.isArray(comments)) return [];
  const parsed = comments.map(comment => doctrine.parse(comment, options));
  return parsed;
};

module.exports = jsdocInfo;
