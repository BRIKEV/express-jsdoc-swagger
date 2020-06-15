const chalk = require('chalk');

const setProperty = require('../utils/setProperty')('parameter');
const formatDescription = require('../utils/formatDescription');
const getSchema = require('./schema');

const REQUIRED = 'required';
const ALLOW_EMPTY_VALUE = 'allowEmptyValue';
const DEPRECATED = 'deprecated';
const BODY_PARAM = 'body';

const defaultParseParameter = {};

const parameterPayload = (options, schema) => ({
  name: setProperty(options, 'name', {
    type: 'string',
    required: true,
  }),
  in: setProperty(options, 'in', {
    type: 'string',
    required: true,
  }),
  description: setProperty(options, 'description', {
    type: 'string',
    defaultValue: '',
  }),
  required: setProperty(options, 'required', {
    type: 'boolean',
    defaultValue: false,
  }),
  deprecated: setProperty(options, 'deprecated', {
    type: 'boolean',
    defaultValue: false,
  }),
  allowEmptyValue: setProperty(options, 'allowEmptyValue', {
    type: 'boolean',
    defaultValue: false,
  }),
  schema,
});

const parseParameter = param => {
  const [name, inOption, ...extraOptions] = param.name.split('.');
  if (!name || !inOption) {
    return defaultParseParameter;
  }
  if (inOption === BODY_PARAM) {
    // eslint-disable-next-line
    console.warn(chalk.yellow(`If you want to add one @param as body you must provide "request.body" instead of ${param.name}`));
    return defaultParseParameter;
  }
  const isRequired = extraOptions.includes(REQUIRED);
  const allowEmptyValue = extraOptions.includes(ALLOW_EMPTY_VALUE);
  const isDeprecated = extraOptions.includes(DEPRECATED);
  const [description, enumValues] = formatDescription(param.description);
  const options = {
    name,
    in: inOption,
    required: isRequired,
    allowEmptyValue,
    deprecated: isDeprecated,
    description,
  };
  const schema = getSchema('@param', param.name)(param.type, enumValues);
  return parameterPayload(options, schema);
};

const parametersGenerator = (paramValues = []) => {
  if (!paramValues || !Array.isArray(paramValues)) return [];
  const params = paramValues.map(parseParameter).filter(param => param.name);
  return params;
};

module.exports = parametersGenerator;
