const { refSchema } = require('./refSchema');

const VALID_TYPES = ['oneOf', 'anyOf', 'allOf'];

/**
 *  This method checks the first item of the data type list to validate if
 * it contains any of the keywords representing the different union types
 * in Swagger: 'oneOf', 'anyOf' or 'allOf'.
 *
 * @param {object[]} elements - List of data types for the property
 * @returns {string|null} Name of the union type (if any)
 */
const getUnionType = elements => {
  const unionType = elements[0].name;

  if (!VALID_TYPES.includes(unionType)) {
    return null;
  }

  return unionType;
};

/**
 *  This method receives an array of data types passed down to the
 * 'property' annotation, for example:
 *
 *    > '{oneOf|string|null}'.
 *
 *  The aim of this method is to process this array and generate
 * the schema for the property, including a list of its types.
 *
 * @param {object[]} elements - List of data types for the property
 * @returns Swagger schema for the property
 */
const combineSchema = elements => {
  let schema = {};
  if (!elements || elements.length === 0) return schema;

  // Check if 'null' is part of the listed types and remove it from the array
  const nullIndex = elements.findIndex(el => el.type === 'NullLiteral');
  if (nullIndex > 0) {
    elements.splice(nullIndex, 1);
    schema = { nullable: true };
  }

  const unionType = getUnionType(elements);
  const types = !unionType ? elements : elements.slice(1);

  // If there are multiple types in the list, wrap them into a union type
  // ('oneOf' will be used by default if none is specified)
  if (types.length > 1 || unionType === 'allOf') {
    schema = {
      ...schema,
      [unionType || 'oneOf']: types.map(type => refSchema(type)),
    };
  } else {
    // If there's only a type in the list, don't wrap it in 'oneOf' or 'anyOf' blocks
    schema = {
      ...schema,
      ...refSchema(types[0]),
    };
  }

  return schema;
};

module.exports = combineSchema;
