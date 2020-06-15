const getSchema = require('./schema');

const DEFAULT_CONTENT_TYPE = 'application/json';

const getContent = entity => (type, contentType, originalValue) => {
  const schema = getSchema(entity, originalValue)(type);
  return {
    [contentType || DEFAULT_CONTENT_TYPE]: {
      schema,
    },
  };
};

module.exports = getContent;
