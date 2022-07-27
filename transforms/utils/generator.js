const generator = (parseParameter, filterKey) => paramValues => {
  if (!paramValues || !Array.isArray(paramValues)) return [];
  return paramValues.map(parseParameter).filter(param => param[filterKey]);
};

module.exports = generator;
