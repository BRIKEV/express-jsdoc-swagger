const errorMessage = require('../utils/errorMessage');
const combineSchema = require('../utils/combineSchema');
const addEnumValues = require('../utils/enumValues');
const { refSchema, formatRefSchema } = require('../utils/refSchema');

const getSchema = (entity, message) => (type, enumValues = []) => {
  if (!type) {
    return errorMessage(`Entity: ${entity} could not be parsed. Value: "${message}" is wrong`);
  }
  const nameType = type.name;
  let schema = {
    ...refSchema(nameType),
  };

  // If param has multiple types, check if null is part of them and remove it from array
  if (type.elements) {
    const nullIndex = type.elements.findIndex(el => el.type === 'NullLiteral');
    if (nullIndex > 0) {
      type.elements.splice(nullIndex, 1);
      schema = { ...schema, nullable: true };
    }
  }

  schema = {
    ...schema,
    ...combineSchema(type.elements),
    ...addEnumValues(enumValues),
  };
  const notPrimitiveType = !nameType;
  if (notPrimitiveType && !type.elements) {
    const parseItems = formatRefSchema(type.applications);
    schema = {
      ...schema,
      type: type.expression.name,
      items: parseItems.items ? parseItems.items : parseItems,
    };
  }
  return schema;
};

module.exports = getSchema;
