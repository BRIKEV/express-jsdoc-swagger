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
    if (types.length > 1) {
      schema = {
        [schemaType]: types.map(type => refSchema(type)),
      };
    } else {
      // If there's only a type in the list, don't wrap it in 'oneOf' / 'anyOf' / 'allOf'
      schema = refSchema(types[0]);
    }
  } else {
    errorMessage(`SchemaType ${schemaType} invalid, it should be one of these ${VALID_TYPES.join(', ')}`);
  }

  return schema;
};

module.exports = combineSchema;
