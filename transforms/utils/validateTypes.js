const TYPES = [
  'integer',
  'number',
  'string',
  'boolean',
  'object',
];

const validateTypes = type => TYPES.includes(type);

module.exports = validateTypes;
