const validateTypes = require('./validateTypes');

const REF_ROUTE = '#/components/schemas/';

const refSchema = value => {
  if (!value) return {};
  const isPrimitive = validateTypes(value);
  const schema = isPrimitive ? { type: value } : { $ref: `${REF_ROUTE}${value}` };
  return schema;
};

module.exports = refSchema;
