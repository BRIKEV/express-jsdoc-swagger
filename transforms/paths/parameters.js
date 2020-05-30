const setProperty = require('../utils/setProperty')('parameter');
const getSchema = require('./schema');

const REQUIRED = 'required';
const ALLOW_EMPTY_VALUE = 'allowEmptyValue';
const DEPRECATED = 'deprecated';
const BODY_PARAM = 'body';

const defaultParseParameter = {};

const parseParameter = param => {
  const [name, inOption, ...extraOptions] = param.name.split('.');
  if (!name || !inOption) {
    return defaultParseParameter;
  }
  if (inOption === BODY_PARAM) {
    return defaultParseParameter;
  }
  const isRequired = extraOptions.includes(REQUIRED);
  const allowEmptyValue = extraOptions.includes(ALLOW_EMPTY_VALUE);
  const isDeprecated = extraOptions.includes(DEPRECATED);
  const options = {
    name,
    in: inOption,
    required: isRequired,
    allowEmptyValue,
    deprecated: isDeprecated,
    description: param.description,
  };
  const schema = getSchema(param.type);
  return {
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
  };
};

const parametersGenerator = (paramValues = []) => {
  if (!paramValues || !Array.isArray(paramValues)) return [];
  const params = paramValues.map(parseParameter).filter(param => param.name);
  return params;
};

module.exports = parametersGenerator;
