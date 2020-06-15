const setProperty = require('../utils/setProperty')('parameter');
const formatDescription = require('../utils/formatDescription');
const getSchema = require('./schema');

const REQUIRED = 'required';
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
  schema,
});

const parseParameter = param => {
  const [name, inOption, ...extraOptions] = param.name.split('.');
  if (!name || !inOption) {
    return defaultParseParameter;
  }
  if (inOption === BODY_PARAM) {
    return defaultParseParameter;
  }
  const isRequired = extraOptions.includes(REQUIRED);
  const isDeprecated = extraOptions.includes(DEPRECATED);
  const [description, enumValues] = formatDescription(param.description);
  const options = {
    name,
    in: inOption,
    required: isRequired,
    deprecated: isDeprecated,
    description,
  };
  const schema = getSchema(param.type, enumValues);
  return parameterPayload(options, schema);
};

const parametersGenerator = (paramValues = []) => {
  if (!paramValues || !Array.isArray(paramValues)) return [];
  const params = paramValues.map(parseParameter).filter(param => param.name);
  return params;
};

module.exports = parametersGenerator;
