const merge = require('merge');
const getContent = require('./content')('@paramFormBody');
const mapDescription = require('../utils/mapDescription');

const DEFAULT_CONTENT_TYPE = 'application/json';

const getRequiredValues = (currentState, contentType, key, isRequired) => {
  const paramContentType = contentType || DEFAULT_CONTENT_TYPE;
  if (currentState.content[paramContentType]) {
    return [
      ...(currentState.content[paramContentType].schema.required || []),
      key,
    ];
  }
  return isRequired ? [key] : [];
};

const formParams = (currentState, key, body, isRequired, requestExamples) => {
  const [description, contentType] = mapDescription(body.description);
  const schema = {
    properties: {
      [key]: {
        type: body.type.name,
        description,
      },
    },
    required: getRequiredValues(currentState, contentType, key, isRequired),
  };
  return {
    content: {
      ...merge.recursive(
        true,
        currentState.content,
        getContent({ name: 'object' }, contentType, description, requestExamples, schema),
      ),
    },
  };
};

module.exports = formParams;
