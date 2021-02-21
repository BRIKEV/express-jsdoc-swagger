const errorMessage = require('../utils/errorMessage');
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

const isHeader = contentType => contentType === 'header';

const formatResponses = (values, examples) => values.reduce((acc, value) => {
  const [status, description, contentType, headerKey] = mapDescription(value.description);
  let headers = {};
  if (isHeader(contentType)) {
    errorMessage(`Status ${status} is not valid to create a response. It will be used as response header`);
    headers = responseHeaders(acc[status], headerKey, description, value.type);
  }

  const exampleList = formatExampleValues(
    examples[status],
    contentType || DEFAULT_CONTENT_TYPE,
    status,
  );

  const newContent = isHeader(contentType) ? {} : getContent(
    value.type,
    contentType,
    value.description,
    exampleList,
  );

  const newDescription = isHeader(contentType) ? {} : { description };

  return {
    ...acc,
    [status]: {
      ...acc[status],
      ...newDescription,
      content: {
        ...(hasOldContent(acc, status) ? { ...acc[status].content } : {}),
        ...newContent,
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
