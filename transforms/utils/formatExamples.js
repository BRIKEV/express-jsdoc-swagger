const errorMessage = require('./errorMessage');

const DEFAULT_CONTENT_TYPE = 'application/json';

const formatJSONExamples = type => (exampleList, contentType, status) => {
  let cloneExamples = type === 'requestBody' ? { ...exampleList } : undefined;
  if (exampleList && contentType === DEFAULT_CONTENT_TYPE) {
    cloneExamples = { ...exampleList };
    Object.keys(cloneExamples)
      .filter(k => typeof cloneExamples[k].value === 'string')
      .forEach(k => {
        try {
          cloneExamples[k].value = JSON.parse(cloneExamples[k].value);
        } catch (err) {
          const message = type === 'requestBody'
            ? 'requestBody example malformed'
            : `response example for status ${status} with content-type ${DEFAULT_CONTENT_TYPE} malformed`;
          errorMessage(message);
        }
      });
  }
  return cloneExamples;
};

module.exports = formatJSONExamples;
