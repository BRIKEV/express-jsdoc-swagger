const chalk = require('chalk');

const combineSchema = require('../utils/combineSchema');
const addEnumValues = require('../utils/enumValues');
const { refSchema, formatRefSchema } = require('../utils/refSchema');

const getSchema = (entity, message) => (type, enumValues = []) => {
  if (!type) {
    // eslint-disable-next-line
    return console.warn(chalk.yellow(`Entity: ${entity} could not be parsed. Value: "${message}" is wrong`));
  }
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
    const parseItems = formatRefSchema(type.applications);
    schema = {
      ...schema,
      type: type.expression.name,
      items: parseItems,
    };
  }
  return schema;
};

module.exports = getSchema;
