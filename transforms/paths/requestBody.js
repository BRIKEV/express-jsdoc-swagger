const setProperty = require('../utils/setProperty')('parameter');
const getContent = require('./content');
const mapDescription = require('../utils/mapDescription');

const REQUIRED = 'required';
const BODY_PARAM = 'body';

const parseBodyParameter = (currentState, body) => {
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
    ...currentState,
    description: setProperty(options, 'description', {
      type: 'string',
    }),
    required: setProperty(options, 'required', {
      type: 'boolean',
      defaultValue: false,
    }),
    content: {
      ...currentState.content,
      ...getContent(body.type, contentType),
    },
  };
};

const bodyParams = ({ name }) => name.includes('request.body');

const INITIAL_STATE = { content: {} };

const requestBodyGenerator = (params = []) => {
  if (!params || !Array.isArray(params)) return {};
  const bodyValues = params.filter(bodyParams);
  const requestBody = bodyValues.reduce((acc, body) => (
    { ...acc, ...parseBodyParameter(acc, body) }
  ), INITIAL_STATE);
  return requestBody;
};

module.exports = requestBodyGenerator;
