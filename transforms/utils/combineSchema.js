const errorMessage = require('./errorMessage');
const { refSchema } = require('./refSchema');

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
    errorMessage(`SchemaType ${schemaType} invalid, it should be one of these ${VALID_TYPES.join(', ')}`);
  }
  return schema;
};

module.exports = combineSchema;
