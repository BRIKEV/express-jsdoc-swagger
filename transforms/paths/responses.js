const chalk = require('chalk');

const STATUS_CODES = require('./validStatusCodes');
const getContent = require('./content');

const responsesGenerator = (returnValues = []) => {
  const mapDescription = description => description.split(' - ');
  if (!returnValues || !Array.isArray(returnValues)) return {};
  const response = returnValues.reduce((acc, value) => {
    const [status, responseDescription, contentType] = mapDescription(value.description);
    if (!STATUS_CODES[Number(status)]) {
      console.warn(chalk.yellow(`Status ${status} is not valid to create a response`));
      return {};
    }
    return {
      ...acc,
      [status]: {
        description: responseDescription,
        content: getContent(value.type, contentType),
      },
    };
  }, {});
  return response;
};

module.exports = responsesGenerator;
