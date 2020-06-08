const chalk = require('chalk');
const refSchema = require('../utils/refSchema');

const VALID_TYPES = ['oneOf', 'anyOf', 'allOf'];

const validType = type => VALID_TYPES.includes(type);

const combineSchema = elements => {
  let schema = {};
  if (!elements || elements.length === 0) return schema;
  const schemaType = elements[0].name;
  const [, ...types] = elements;
  if (validType(schemaType)) {
    schema = {
      [schemaType]: types.map(type => refSchema(type.name)),
    };
  } else {
    console.warn(chalk.yellow(`SchemaType ${schemaType} invalid, it should be one of these ${VALID_TYPES.join(', ')}`));
  }
  return schema;
};

const getSchema = type => {
  const nameType = type.name;
  let schema = {
    ...refSchema(nameType),
  };
  schema = {
    ...combineSchema(type.elements),
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
