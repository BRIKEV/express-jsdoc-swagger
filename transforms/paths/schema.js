const refSchema = require('../utils/refSchema');

const getSchema = type => {
  const nameType = type.name;
  let schema = {
    ...refSchema(nameType),
  };
  const notPrimitiveType = !nameType;
  if (notPrimitiveType) {
    const items = type.applications || {};
    const parseItems = items.reduce((itemAcc, itemTypes) => ({
      ...itemAcc,
      type: itemTypes.name,
    }), {});
    schema = {
      ...schema,
      type: type.expression.name,
      items: parseItems,
    };
  }
  return schema;
};

module.exports = getSchema;
