const chalk = require('chalk');

const setProperty = require('../utils/setProperty')('parameter');
const getContent = require('./content');
const mapDescription = require('../utils/mapDescription');

const REQUIRED = 'required';
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
  return {
    description: setProperty(options, 'description', {
      type: 'string',
    }),
    required: setProperty(options, 'required', {
      type: 'boolean',
      defaultValue: false,
    }),
    content: getContent(body.type, contentType),
  };
};

const requestBodyGenerator = (bodyValues = []) => {
  if (!bodyValues || !Array.isArray(bodyValues)) return {};
  if (bodyValues.length > 1) console.warn(chalk.yellow('You should only provide one request body'));
  const params = parseBodyParameter(bodyValues[0]);
  return params;
};

module.exports = requestBodyGenerator;
