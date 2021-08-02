const errorMessage = require('../utils/errorMessage');
const STATUS_CODES = require('./validStatusCodes');
const mapDescription = require('../utils/mapDescription');
const getContent = require('./content')('@return');
const formatExampleValues = require('../utils/formatExamples')('responses');

const DEFAULT_CONTENT_TYPE = 'application/json';

const hasOldContent = (value, status) => (value[status] && value[status].content);

const formatResponses = (values, examples) => values.reduce((acc, value) => {
  const [status, description, contentType] = mapDescription(value.description);
  if (!STATUS_CODES[status]) {
    errorMessage(`Status ${status} is not valid to create a response`);
    return {};
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
      ...(value.type ? {
        content: {
          ...(hasOldContent(acc, status) ? { ...acc[status].content } : {}),
          ...getContent(value.type, contentType, value.description, exampleList),
        },
      } : {}),
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
