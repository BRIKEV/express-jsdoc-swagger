const TYPES = [
  'integer',
  'number',
  'string',
  'boolean',
];

const validateTypes = type => TYPES.includes(type);

module.exports = validateTypes;
