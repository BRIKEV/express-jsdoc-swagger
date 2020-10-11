const mapDescription = require('../utils/mapDescription');

const REQUEST_BODY = 'request';
const RESPONSE_BODY = 'response';

const parseExample = example => {
  const bodyStartIndex = example.description.indexOf('\r\n');
  const description = example.description.substring(0, bodyStartIndex);
  const sampleBody = example.description.substring(bodyStartIndex + 1);

  const [type, ...data] = mapDescription(description);

  if (type === REQUEST_BODY) {
    const [summary] = data;
    return {
      type,
      summary,
      value: sampleBody,
    };
  }

  if (type === RESPONSE_BODY) {
    const [status, summary] = data;
    return {
      type,
      status,
      summary,
      value: sampleBody,
    };
  }

  return {};
};

const examplesGenerator = (exampleValues = []) => {
  if (!exampleValues || !Array.isArray(exampleValues)) return [];
  // TODO: filter invalid examples
  const examples = exampleValues.map(parseExample).filter(example => example.type);
  return examples;
};

module.exports = examplesGenerator;
