const chalk = require('chalk');

const STATUS_CODES = require('./validStatusCodes');

const DEFAULT_CONTENT_TYPE = 'application/json';

const responsesGenerator = (returnValues = []) => {
  const mapDescription = description => description.split(' - ');
  if (!returnValues || !Array.isArray(returnValues)) return {};
  const response = returnValues.reduce((acc, value) => {
    const [status, responseDescription, contentType] = mapDescription(value.description);
    if (!STATUS_CODES[Number(status)]) {
      console.warn(chalk.yellow(`Status ${status} is not valid to create a response`));
      return {};
    }
    let schema = {
      type: value.type.name,
    };
    const notPrimitiveType = !value.type.name;
    if (notPrimitiveType) {
      const items = value.type.applications || {};
      const parseItems = items.reduce((itemAcc, itemTypes) => ({
        ...itemAcc,
        type: itemTypes.name,
      }), {});
      schema = {
        ...schema,
        type: value.type.expression.name,
        items: parseItems,
      };
    }
    return {
      ...acc,
      [status]: {
        description: responseDescription,
        content: {
          [contentType || DEFAULT_CONTENT_TYPE]: {
            schema,
          },
        },
      },
    };
  }, {});
  return response;
};

module.exports = responsesGenerator;
