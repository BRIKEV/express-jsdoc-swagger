const errorMessage = require('../utils/errorMessage');
const STATUS_CODES = require('./validStatusCodes');
const mapDescription = require('../utils/mapDescription');
const getContent = require('./content')('@return');

const DEFAULT_CONTENT_TYPE = 'application/json';

const hasOldContent = (value, status) => (value[status] && value[status].content);

const formatResponses = (values, examples) => values.reduce((acc, value) => {
  const [status, description, contentType] = mapDescription(value.description);
  if (!STATUS_CODES[status]) {
    errorMessage(`Status ${status} is not valid to create a response`);
    return {};
  }

  const exampleList = examples[status];
  if (exampleList && (contentType === DEFAULT_CONTENT_TYPE || !contentType)) {
    Object.keys(exampleList)
      .filter(k => typeof exampleList[k].value === 'string')
      .forEach(k => {
        try {
          exampleList[k].value = JSON.parse(exampleList[k].value);
        } catch (err) {
          errorMessage(`response example for status ${status} with content-type ${contentType} malformed`);
        }
      });
  }

  return {
    ...acc,
    [status]: {
      description,
      content: {
        ...(hasOldContent(acc, status) ? { ...acc[status].content } : {}),
        ...getContent(value.type, contentType, value.description, exampleList),
      },
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
