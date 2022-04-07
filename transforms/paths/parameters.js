const errorMessage = require('../utils/errorMessage');
const setProperty = require('../utils/setProperty')('parameter');
const formatDescription = require('../utils/formatDescription');
const getSchema = require('./schema');
const generator = require('../utils/generator');

const REQUIRED = 'required';
const DEPRECATED = 'deprecated';
const EXPLODE = 'explode';
const NOEXPLODE = 'noexplode';
const BODY_PARAM = 'body';
const FORM_TYPE = 'form';

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
  explode: setProperty(options, 'explode', {
    type: 'boolean',
  }),
  schema,
});

const wrongInOption = paramValue => {
  if (!paramValue.includes('request.body')) {
    errorMessage(`If you want to add one @param as body you must provide "request.body" instead of ${paramValue}`);
  }
  return defaultParseParameter;
};

const parseParameter = param => {
  const [name, inOption, ...extraOptions] = param.name.split('.');
  if (!name || !inOption || inOption === FORM_TYPE) {
    return defaultParseParameter;
  }
  if (inOption === BODY_PARAM) {
    return wrongInOption(param.name);
  }
  const isRequired = extraOptions.includes(REQUIRED);
  const isDeprecated = extraOptions.includes(DEPRECATED);
  const shouldExplode = extraOptions.includes(EXPLODE);
  const shouldNotExplode = extraOptions.includes(NOEXPLODE);
  const [description, enumValues, jsonOptions] = formatDescription(param.description);
  const options = {
    name,
    in: inOption,
    required: isRequired,
    deprecated: isDeprecated,
    description,
  };
  // Used this format because default when undefined is different depending on if it is a query/form or not
  if (shouldExplode) {
    options.explode = true;
  } else if (shouldNotExplode) {
    options.explode = false;
  }
  const schema = getSchema('@param', param.name)(param.type, enumValues, jsonOptions);
  return parameterPayload(options, schema);
};

module.exports = generator(parseParameter, 'name');
