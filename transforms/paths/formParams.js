const merge = require('merge');
const getContent = require('./content')('@paramFormBody');
const mapDescription = require('../utils/mapDescription');

const DEFAULT_CONTENT_TYPE = 'application/json';

const formParams = (currentState, key, body, isRequired, requestExamples) => {
  const bodyType = { name: 'object' };
  const [description, contentType] = mapDescription(body.description);
  let requiredValues = isRequired ? [key] : [];
  const paramContentType = contentType || DEFAULT_CONTENT_TYPE;
  if (currentState.content[paramContentType]) {
    requiredValues = [...currentState.content[paramContentType].schema.required, key];
  }
  const schema = {
    properties: {
      [key]: {
        type: body.type.name,
        description,
      },
    },
    required: requiredValues,
  };
  return {
    content: {
      ...merge.recursive(
        true,
        currentState.content,
        getContent(bodyType, contentType, description, requestExamples, schema),
      ),
    },
  };
};

module.exports = formParams;
