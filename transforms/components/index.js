const { getTagInfo, getTagsInfo } = require('../utils/tags');
const refSchema = require('../utils/refSchema');

const REQUIRED = 'required';

const getPropertyName = ({ name: propertyName }) => {
  const [name] = propertyName.split('.');
  return name;
};

const formatProperties = properties => {
  if (!properties || !Array.isArray(properties)) return {};
  return properties.reduce((acum, property) => {
    const name = getPropertyName(property);
    const propertyName = property.type.name;
    const [description, format] = property.description.split(' - ');
    return {
      ...acum,
      [name]: {
        description,
        ...refSchema(propertyName),
        ...(format ? { format } : {}),
      },
    };
  }, {});
};

const isPropertyRequired = properties => {
  if (!properties || !Array.isArray(properties)) return [];
  return properties.filter(({ name }) => name.includes(REQUIRED)).map(getPropertyName);
};

const parseSchema = schema => {
  const typedef = getTagInfo(schema.tags, 'typedef');
  const propertyValues = getTagsInfo(schema.tags, 'property');
  return {
    [typedef.name]: {
      description: schema.description,
      required: isPropertyRequired(propertyValues),
      type: 'object',
      properties: formatProperties(propertyValues),
    },
  };
};

const parseComponents = (swaggerObject = {}, components = []) => {
  if (!components || !Array.isArray(components)) return { components: { schemas: {} } };
  const componentSchema = components.reduce((acum, item) => ({
    ...acum, ...parseSchema(item),
  }), {});
  return {
    ...swaggerObject,
    components: {
      schemas: componentSchema,
    },
  };
};

module.exports = parseComponents;
