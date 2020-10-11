const mapDescription = require('../utils/mapDescription');

const REQUEST_BODY = 'request';
const RESPONSE_BODY = 'response';

const parseRequestPayloadExample = (description, value) => {
  const [summary] = description;
  return {
    type: REQUEST_BODY,
    summary,
    value,
  };
};

const parseResponsePayloadExample = (description, value) => {
  const [status, summary] = description;
  return {
    type: RESPONSE_BODY,
    status,
    summary,
    value,
  };
};

const parseExample = example => {
  const bodyStartIndex = example.description.indexOf('\r\n');
  const description = example.description.substring(0, bodyStartIndex);
  const content = example.description.substring(bodyStartIndex);

  const [type, ...metadata] = mapDescription(description);

  switch (type) {
    case REQUEST_BODY:
      return parseRequestPayloadExample(metadata, content);
    case RESPONSE_BODY:
      return parseResponsePayloadExample(metadata, content);
    default:
      return {};
  }
};

const examplesGenerator = (exampleValues = []) => {
  if (!exampleValues || !Array.isArray(exampleValues)) return [];
  const examples = exampleValues.map(parseExample).filter(example => example.type);
  return examples;
};

module.exports = examplesGenerator;
