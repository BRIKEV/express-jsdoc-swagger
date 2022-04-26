const errorMessage = require('../utils/errorMessage');
const combineSchema = require('../utils/combineSchema');
const addDefaultValue = require('../utils/defaultValue');
const addEnumValues = require('../utils/enumValues');
const { refSchema, formatRefSchema } = require('../utils/refSchema');

const getSchema = (entity, message) => (type, defaultValue = '', enumValues = [], jsonOptions = {}) => {
  if (!type) {
    return errorMessage(`Entity: ${entity} could not be parsed. Value: "${message}" is wrong`);
  }
  const nameType = type.name;
  let schema = {
    ...refSchema(nameType),
  };

  schema = {
    ...schema,
    ...combineSchema(type.elements),
    ...addDefaultValue(defaultValue),
    ...addEnumValues(enumValues),
    ...jsonOptions,
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
