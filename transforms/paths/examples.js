const STATUS_CODES = require('./validStatusCodes');

const errorMessage = require('../utils/errorMessage');
const mapDescription = require('../utils/mapDescription');
const generator = require('../utils/generator');

const REQUEST_BODY = 'request';
const RESPONSE_BODY = 'response';

// Generates a new object with information on a request body example
const parseRequestPayloadExample = (description, content) => {
  const [summary] = description;
  return {
    type: REQUEST_BODY,
    summary,
    value: content,
  };
};

const showError = message => {
  errorMessage(message);
  return {};
};

// Generates a new object with information on a response body example
const parseResponsePayloadExample = (description, content) => {
  const [status, summary] = description;
  if (!STATUS_CODES[status]) {
    return showError(`${status} is not a valid status for a response`);
  }
  return {
    type: RESPONSE_BODY,
    status,
    summary,
    value: content,
  };
};

const getParsedExample = ({ type, metadata, content }) => {
  const types = {
    [REQUEST_BODY]: () => parseRequestPayloadExample(metadata, content),
    [RESPONSE_BODY]: () => parseResponsePayloadExample(metadata, content),
    default: () => showError(`Cannot determine where to use example of type ${type}`),
  };
  return (types[type] || types.default)();
};

/**
 *  Parses a single example tag contents. Depending on the type (response or
 * request), the expected data and returned structure will be different.
 *
 *  To prevent compatibility issues between SO, all `\r\n` instances (used in
 * Windows by default as end of line sequence) will be replaced by `\n`.
 *
 * @param {string} exampleTagDescription - Text passed to the example tag.
 *
 * @return {object} Structured information about the example, including the
 * example type (request or response), summary, status code (only applicable to
 * response types) and the example code itself.
 */
const parseExample = ({ description: exampleTagDescription }) => {
  const formattedTagDescription = exampleTagDescription.replace(/\r\n/gi, '\n');

  // The example content starts right after the first end of line character
  const contentStartIndex = formattedTagDescription.indexOf('\n');
  const content = formattedTagDescription.substring(contentStartIndex + 1);
  const description = formattedTagDescription.substring(0, contentStartIndex);

  const [type, ...metadata] = mapDescription(description);

  return getParsedExample({ type, metadata, content });
};

/**
 *  This receives a set of values extracted from "example" tags, and translates
 * them to objects with the example type (request or response), summary, status
 * code (only applicable to response types) and the example code itself.
 *
 * @param {object[]} exampleTags - Set of example tags, which description are
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
const exampleGenerator = generator(parseExample, 'type');

module.exports = exampleGenerator;
