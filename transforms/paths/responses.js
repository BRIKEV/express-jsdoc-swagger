const errorMessage = require('../utils/errorMessage');
const STATUS_CODES = require('./validStatusCodes');
const mapDescription = require('../utils/mapDescription');
const getContent = require('./content')('@return');
const getSchema = require('./schema')('@return');
const formatExampleValues = require('../utils/formatExamples')('responses');

const DEFAULT_CONTENT_TYPE = 'application/json';

const hasOldContent = (value, status) => (value[status] && value[status].content);

const responseHeaders = (currentState, headerKey, description, type) => {
  const currentHeaders = currentState && currentState.headers ? currentState.headers : {};
  return {
    headers: {
      ...currentHeaders,
      [headerKey]: {
        schema: getSchema(type),
        description,
      },
    },
  };
};

const formatResponses = (values, examples) => values.reduce((acc, value) => {
  const [status, description, contentType] = mapDescription(value.description);
  let headers = {};
  if (!STATUS_CODES[status]) {
    errorMessage(`Status ${status} is not valid to create a response. It will be used as response header`);
    headers = responseHeaders(acc[status], status, description, value.type);
  }

  const exampleList = formatExampleValues(
    examples[status],
    contentType || DEFAULT_CONTENT_TYPE,
    status,
  );

  return {
    ...acc,
    [status]: {
      description,
      content: {
        ...(hasOldContent(acc, status) ? { ...acc[status].content } : {}),
        ...getContent(value.type, contentType, value.description, exampleList),
      },
      ...headers,
    },
  };
}, {});

const formatExamples = (exampleValues = []) => exampleValues
  .reduce((exampleMap, example, i) => ({
    ...exampleMap,
    [example.status]: {
      ...exampleMap[example.status],
      [`example${i + 1}`]: {
        summary: example.summary,
        value: example.value,
      },
    },
  }), {});

const responsesGenerator = (returnValues = [], exampleValues = []) => {
  if (!returnValues || !Array.isArray(returnValues)) return {};
  return formatResponses(returnValues, formatExamples(exampleValues));
};

module.exports = responsesGenerator;
