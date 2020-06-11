const combineSchema = require('../utils/combineSchema');
const refSchema = require('../utils/refSchema');

const addEnumValues = values => {
  if (values.length === 0) {
    return {};
  }
  return { enum: values };
};

const getSchema = (type, enumValues = []) => {
  const nameType = type.name;
  let schema = {
    ...refSchema(nameType),
  };
  schema = {
    ...schema,
    ...combineSchema(type.elements),
    ...addEnumValues(enumValues),
  };
  const notPrimitiveType = !nameType;
  if (notPrimitiveType && !type.elements) {
    const items = type.applications || [];
    const parseItems = items.reduce((itemAcc, itemTypes) => ({
      ...itemAcc,
      ...refSchema(itemTypes.name),
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
