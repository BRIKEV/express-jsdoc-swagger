const getSchema = require('./schema');

const DEFAULT_CONTENT_TYPE = 'application/json';

const getContent = (type, contentType) => {
  const schema = getSchema(type);
  return {
    [contentType || DEFAULT_CONTENT_TYPE]: {
      schema,
    },
  };
};

module.exports = getContent;
