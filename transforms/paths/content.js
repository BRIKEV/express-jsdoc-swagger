const getSchema = require('./schema');

const DEFAULT_CONTENT_TYPE = 'application/json';

const getContent = entity => (type, contentType, originalValue, examples, extendSchema = {}) => {
  const schema = getSchema(entity, originalValue)(type);
  return {
    [contentType || DEFAULT_CONTENT_TYPE]: {
      schema: {
        ...schema,
        ...extendSchema,
      },
      ...(examples ? { examples } : {}),
    },
  };
};

module.exports = getContent;
