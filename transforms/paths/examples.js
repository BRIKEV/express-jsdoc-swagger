const STATUS_CODES = require('./validStatusCodes');

const errorMessage = require('../utils/errorMessage');
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
  if (!STATUS_CODES[status]) {
    errorMessage(`${status} is not a valid status for a response`);
    return {};
  }
  return {
    type: RESPONSE_BODY,
    status,
    summary,
    value,
  };
};

const parseExample = example => {
  const tagDescription = example.description.replace(/\r\n/gi, '\n');
  const contentStartIndex = tagDescription.indexOf('\n');

  const content = tagDescription.substring(contentStartIndex + 1);
  const description = tagDescription.substring(0, contentStartIndex);

  const [type, ...metadata] = mapDescription(description);

  switch (type) {
    case REQUEST_BODY:
      return parseRequestPayloadExample(metadata, content);
    case RESPONSE_BODY:
      return parseResponsePayloadExample(metadata, content);
    default:
      errorMessage(`Cannot determine where to use example of type ${type}`);
      return {};
  }
};

/**
 *  This receives a set of values extracted from "example" tags, and translates
 * them to objects with the example type (request or response), summary, status
 * code (only applicable to response types) and the example code itself.
 *
 * @param {object[]} exampleValues - Set of example tags, which description are
 *  expected to have the following information in order to be parsed properly:
 *
 *    > For request body examples:
 *
 *      response - [example summary]
 *      [example content]
 *
 *    > For response examples:
 *
 *      response - [http status code] - [example summary]
 *      [example content]
 *
 * @return {object[]} List of objects containing the example type (request or
 *  response), summary, status code (only applicable to response types) and
 *  the example code itself.
 */
const examplesGenerator = (exampleValues = []) => {
  if (!exampleValues || !Array.isArray(exampleValues)) return [];
  const examples = exampleValues.map(parseExample).filter(example => example.type);
  return examples;
};

module.exports = examplesGenerator;
