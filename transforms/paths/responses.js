const chalk = require('chalk');

const STATUS_CODES = require('./validStatusCodes');
const getContent = require('./content');

const mapDescription = description => description.split(' - ');

const hasOldContent = (value, status) => (value[status] && value[status].content);

const responsesGenerator = (returnValues = []) => {
  if (!returnValues || !Array.isArray(returnValues)) return {};
  const responses = returnValues.reduce((acc, value) => {
    const [status, description, contentType] = mapDescription(value.description);
    if (!STATUS_CODES[Number(status)]) {
      // eslint-disable-next-line
      console.warn(chalk.yellow(`Status ${status} is not valid to create a response`));
      return {};
    }
    return {
      ...acc,
      [status]: {
        description,
        content: {
          ...(hasOldContent(acc, status) ? { ...acc[status].content } : {}),
          ...getContent(value.type, contentType),
        },
      },
    };
  }, {});
  return responses;
};

module.exports = responsesGenerator;
