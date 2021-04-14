const validateTypes = require('./validateTypes');

const REF_ROUTE = '#/components/schemas/';

const refSchema = value => {
  // support * @return {array<Song|Album>} 200 - fetch Home Content response
  if (value && value.type === 'UnionType') {
    const items = [];
    value.elements.forEach(el => {
      const isPrimitive = validateTypes(el.name);
      items.push(isPrimitive ? { type: el.name } : { $ref: `${REF_ROUTE}${el.name}` });
    });
    return {
      anyOf: items,
    };
  }

  // support * @property {anyOf|Song[]|Album|string|string[]} firstSong
  if (value && value.expression && value.expression.name.toLowerCase() === 'array' && value.type === 'TypeApplication') {
    const isPrimitive = validateTypes(value.applications[0].name);
    return isPrimitive ? {
      type: 'array',
      items: { type: value.applications[0].name },
    } : {
      type: 'array',
      items: { $ref: `${REF_ROUTE}${value.applications[0].name}` },
    };
  }

  if (!value) return {};

  const nameValue = value.name || value;
  // support null
  if (nameValue.type === 'NullLiteral') return { nullable: true };

  const isPrimitive = validateTypes(nameValue);
  return isPrimitive ? { type: nameValue } : { $ref: `${REF_ROUTE}${nameValue}` };
};

const formatRefSchema = (applications = []) => applications.reduce((itemAcc, itemTypes) => ({
  ...itemAcc,
  ...refSchema(itemTypes),
}), {});

module.exports = {
  refSchema,
  formatRefSchema,
};
