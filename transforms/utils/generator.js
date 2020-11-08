const generator = (parseParameter, filterKey) => paramValues => {
  if (!paramValues || !Array.isArray(paramValues)) return [];
  const params = paramValues.map(parseParameter).filter(param => param[filterKey]);
  return params;
};

module.exports = generator;
