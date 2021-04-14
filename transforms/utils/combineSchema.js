const errorMessage = require('./errorMessage');
const { refSchema } = require('./refSchema');

const VALID_TYPES = ['oneOf', 'anyOf', 'allOf'];

const validType = type => VALID_TYPES.includes(type);

const combineSchema = elements => {
  let schema = {};
  if (!elements || elements.length === 0) return schema;

  // If param has multiple types, check if null is part of them and remove it from array
  const nullIndex = elements.findIndex(el => el.type === 'NullLiteral');
  if (nullIndex > 0) {
    elements.splice(nullIndex, 1);
    schema = { nullable: true };
  }

  const schemaType = elements[0].name;
  const [, ...types] = elements;

  if (validType(schemaType)) {
    if (types.length > 1 || schemaType === 'allOf') {
      schema = {
        ...schema,
        [schemaType]: types.map(type => refSchema(type)),
      };
    } else {
      // If there's only a type in the list, don't wrap it in 'oneOf' or 'anyOf'
      schema = {
        ...schema,
        ...refSchema(types[0]),
      };
    }
  } else {
    errorMessage(`SchemaType ${schemaType} invalid, it should be one of these ${VALID_TYPES.join(', ')}`);
  }

  return schema;
};

module.exports = combineSchema;
