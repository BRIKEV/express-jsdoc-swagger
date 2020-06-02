
const formatSecurity = ({ security: securitySchemes }) => {
  const securityTypes = Object.keys(securitySchemes);
  return securityTypes.map(type => ({ [type]: [] }));
};

const parseSecuritySchemas = (swaggerObject = {}) => {
  const updatedSwaggerObject = {
    ...swaggerObject,
    security: formatSecurity(swaggerObject),
  };
  return updatedSwaggerObject;
};

module.exports = parseSecuritySchemas;
