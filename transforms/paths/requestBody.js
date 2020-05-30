const chalk = require('chalk');

const setProperty = require('../utils/setProperty')('parameter');
const getSchema = require('./schema');
const mapDescription = require('../utils/mapDescription');

const REQUIRED = 'required';
const DEFAULT_CONTENT_TYPE = 'application/json';
const BODY_PARAM = 'body';

const parseBodyParameter = body => {
  const [name, inOption, ...extraOptions] = body.name.split('.');
  if (inOption !== BODY_PARAM) {
    return {};
  }
  const isRequired = extraOptions.includes(REQUIRED);
  const [description, contentType] = mapDescription(body.description);
  const options = {
    name,
    required: isRequired,
    description,
  };
  const schema = getSchema(body.type);
  return {
    description: setProperty(options, 'description', {
      type: 'string',
    }),
    required: setProperty(options, 'required', {
      type: 'boolean',
      defaultValue: false,
    }),
    content: {
      [contentType || DEFAULT_CONTENT_TYPE]: {
        schema,
      },
    },
  };
};

const requestBodyGenerator = (bodyValues = []) => {
  if (!bodyValues || !Array.isArray(bodyValues)) return {};
  if (bodyValues.length > 1) console.warn(chalk.yellow('You should only provide one request body'));
  const params = parseBodyParameter(bodyValues[0]);
  return params;
};

module.exports = requestBodyGenerator;
