const examplesGenerator = require('./examples');
const responsesGenerator = require('./responses');
const parametersGenerator = require('./parameters');
const requestBodyGenerator = require('./requestBody');
const { getTagInfo, getTagsInfo, formatDescriptionTag } = require('../utils/tags');
const {
  validRequestBodyMethods: bodyMethods,
  validHTTPMethod,
} = require('../utils/httpMethods');
const formatSecurity = require('./security');

const formatTags = (tags = []) => tags.map(({ description }) => {
  const { name } = formatDescriptionTag(description);
  return name;
});

const formatSummary = summary => (summary || {}).description || '';

const formatDescription = description => (description || {}).description || undefined;

const setRequestBody = (lowerCaseMethod, bodyValues, requestExamples) => {
  const hasBodyValues = bodyValues.length > 0;
  const requestBody = requestBodyGenerator(requestExamples, bodyValues);
  return bodyMethods[lowerCaseMethod] && hasBodyValues ? { requestBody } : {};
};

const bodyParams = ({ name }) => name.includes('request.body') || name.includes('.form');

const getOperationId = operationIdTag => {
  if (!operationIdTag) return {};
  return {
    operationId: operationIdTag.description,
  };
};

const pathValues = tags => {
  const examplesValues = getTagsInfo(tags, 'example');
  const examples = examplesGenerator(examplesValues);

  const summary = getTagInfo(tags, 'summary');
  const description = getTagInfo(tags, 'description');
  const deprecated = getTagInfo(tags, 'deprecated');
  const isDeprecated = !!deprecated;
  /* Response info */
  const returnValues = [
    ...getTagsInfo(tags, 'return'),
    ...getTagsInfo(tags, 'returns'),
  ];
  const responseExamples = examples.filter(example => example.type === 'response');
  const responses = responsesGenerator(returnValues, responseExamples);
  /* Parameters info */
  const operationId = getTagsInfo(tags, 'operationId');
  const paramValues = getTagsInfo(tags, 'param');
  const parameters = parametersGenerator(paramValues);
  /* Tags info */
  const tagsValues = getTagsInfo(tags, 'tags');
  /* Security info */
  const securityValues = getTagsInfo(tags, 'security');
  /* Request body info */
  const bodyValues = paramValues.filter(bodyParams);
  return {
    summary,
    description,
    isDeprecated,
    responses,
    parameters,
    tagsValues,
    bodyValues,
    securityValues,
    examples,
    operationId: operationId[0],
  };
};

const parsePath = (path, state) => {
  if (!path.description || !path.tags) return {};
  const [method, endpoint] = path.description.split(' ');
  // if jsdoc comment does not contain structure <Method> - <Endpoint> is not valid path
  const lowerCaseMethod = method.toLowerCase();
  if (!validHTTPMethod(lowerCaseMethod)) return {};
  const { tags } = path;
  const {
    summary,
    description,
    bodyValues,
    isDeprecated,
    responses,
    parameters,
    tagsValues,
    securityValues,
    examples,
    operationId,
  } = pathValues(tags);
  const requestExamples = examples.filter(example => example.type === 'request');
  return {
    ...state,
    [endpoint]: {
      ...state[endpoint],
      [lowerCaseMethod]: {
        deprecated: isDeprecated,
        summary: formatSummary(summary),
        description: formatDescription(description),
        security: formatSecurity(securityValues),
        responses,
        parameters,
        tags: formatTags(tagsValues),
        ...(setRequestBody(lowerCaseMethod, bodyValues, requestExamples)),
        ...(getOperationId(operationId)),
      },
    },
  };
};

const getPathObject = paths => paths.reduce((acum, item) => ({
  ...acum, ...parsePath(item, acum),
}), {});

const parsePaths = (swaggerObject = {}, paths = []) => {
  if (!paths || !Array.isArray(paths)) return { paths: {} };
  const pathObject = getPathObject(paths);
  return {
    ...swaggerObject,
    paths: pathObject,
  };
};

module.exports = parsePaths;
