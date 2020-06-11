const { getTagInfo, getTagsInfo } = require('../utils/tags');
const mapDescription = require('../utils/mapDescription');
const refSchema = require('../utils/refSchema');
const addEnumValues = require('../utils/enumValues');
const formatDescription = require('../utils/formatDescription');
const combineSchema = require('../utils/combineSchema');

const REQUIRED = 'required';

const getPropertyName = ({ name: propertyName }) => {
  const [name] = propertyName.split('.');
  return name;
};

const formatProperties = properties => {
  if (!properties || !Array.isArray(properties)) return {};
  return properties.reduce((acum, property) => {
    const name = getPropertyName(property);
    const type = property.type.name;
    const [descriptionValue, enumValues] = formatDescription(property.description);
    const [description, format] = mapDescription(descriptionValue);
    return {
      ...acum,
      [name]: {
        description,
        ...refSchema(type),
        ...combineSchema(property.type.elements),
        ...(format ? { format } : {}),
        ...addEnumValues(enumValues),
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
  if (!typedef || !typedef.name) return {};
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
      ...swaggerObject.components,
      schemas: componentSchema,
    },
  };
};

module.exports = parseComponents;
