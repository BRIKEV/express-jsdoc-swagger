const formatSecurity = securitySchemes => {
  const securityTypes = Object.keys(securitySchemes);
  return securityTypes.map(type => ({ [type]: [] }));
};

const parseSecuritySchemas = (swaggerObject = {}) => {
  const { security } = swaggerObject;
  return {
    ...swaggerObject,
    ...(security ? { security: formatSecurity(security) } : {}),
    components: {
      ...swaggerObject.components,
      ...(security ? { securitySchemes: security } : {}),
    },
  };
};

module.exports = parseSecuritySchemas;
