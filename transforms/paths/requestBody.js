const setProperty = require('../utils/setProperty')('parameter');
const getContent = require('./content')('@paramBody');
const mapDescription = require('../utils/mapDescription');
const formParams = require('./formParams');
const formatExampleValues = require('../utils/formatExamples')('requestBody');

const REQUIRED = 'required';
const FORM_TYPE = 'form';

const formatExamples = (exampleValues = []) => exampleValues
  .reduce((exampleMap, example, i) => ({
    ...exampleMap,
    [`example${i + 1}`]: {
      summary: example.summary,
      value: example.value,
    },
  }), {});

const checkExamples = examples => {
  const isExample = Array.isArray(examples) && examples.length > 0;
  return isExample ? formatExamples(examples) : undefined;
};

const parseBodyParameter = (currentState, body, examples) => {
  const [name, ...extraOptions] = body.name.split('.');
  const isRequired = extraOptions.includes(REQUIRED);
  const hasForm = extraOptions.includes(FORM_TYPE);
  const [description, contentType] = mapDescription(body.description);
  const options = { name, required: isRequired, description };

  const examplesParsed = examples.map(example => (
    formatExampleValues(example, contentType)
  ));

  if (hasForm) {
    return formParams(currentState, name, body, isRequired, checkExamples(examplesParsed));
  }

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
      ...getContent(body.type, contentType, body.description, checkExamples(examplesParsed)),
    },
  };
};

const INITIAL_STATE = { content: {} };

const requestBodyGenerator = (examples, params = []) => {
  if (!params || !Array.isArray(params)) return {};

  return params.reduce((acc, body) => (
    { ...acc, ...parseBodyParameter(acc, body, examples) }
  ), INITIAL_STATE);
};

module.exports = requestBodyGenerator;
