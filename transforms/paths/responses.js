const errorMessage = require('../utils/errorMessage');
const STATUS_CODES = require('./validStatusCodes');
const mapDescription = require('../utils/mapDescription');
const getContent = require('./content')('@return');

const hasOldContent = (value, status) => (value[status] && value[status].content);

const formatResponses = values => values.reduce((acc, value) => {
  const [status, description, contentType] = mapDescription(value.description);
  if (!STATUS_CODES[status]) {
    errorMessage(`Status ${status} is not valid to create a response`);
    return {};
  }
  return {
    ...acc,
    [status]: {
      description,
      content: {
        ...(hasOldContent(acc, status) ? { ...acc[status].content } : {}),
        ...getContent(value.type, contentType, value.description),
      },
    },
  };
}, {});

const responsesGenerator = (returnValues = []) => {
  if (!returnValues || !Array.isArray(returnValues)) return {};
  return formatResponses(returnValues);
};

module.exports = responsesGenerator;
