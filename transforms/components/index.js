const { getTagInfo, getTagsInfo } = require('../utils/tags');
const mapDescription = require('../utils/mapDescription');
const { refSchema, formatRefSchema } = require('../utils/refSchema');
const addEnumValues = require('../utils/enumValues');
const formatDescription = require('../utils/formatDescription');
const combineSchema = require('../utils/combineSchema');

const REQUIRED = 'required';

const getPropertyName = ({ name: propertyName }) => {
  const [name] = propertyName.split('.');
  return name;
};

const addTypeApplication = (applications, expression) => {
  if (!applications && !expression) return {};
  return {
    type: expression.name,
    items: {
      type: applications[0].name,
    },
  };
};

const addRefSchema = (typeName, applications, elements) => {
  if (!typeName && !elements) return { items: formatRefSchema(applications) };
  return {};
};

const formatProperties = (properties, options = {}) => {
  if (!properties || !Array.isArray(properties)) return {};
  return properties.reduce((acum, property) => {
    const name = getPropertyName(property);
    const isRequired = property.name.includes(REQUIRED);
    const {
      name: typeName, applications, expression, elements,
    } = property.type;
    const [descriptionValue, enumValues, jsonOptions] = formatDescription(property.description);
    const [description, format] = mapDescription(descriptionValue);
    return {
      ...acum,
      [name]: {
        description,
        ...refSchema(typeName),
        ...combineSchema(elements),
        ...addTypeApplication(applications, expression),
        ...addRefSchema(typeName, applications, elements),
        ...(format ? { format } : {}),
        ...addEnumValues(enumValues),

        // Add nullable to non-required fields if option to do that is enabled
        ...(options.notRequiredAsNullable && !isRequired ? {
          nullable: true,
        } : {}),
        ...(jsonOptions || {}),
      },
    };
  }, {});
};

const getRequiredProperties = properties => (
  properties.filter(({ name }) => name.includes(REQUIRED))
);

const formatRequiredProperties = requiredProperties => requiredProperties.map(getPropertyName);

const parseSchema = (schema, options = {}) => {
  const typedef = getTagInfo(schema.tags, 'typedef');
  const propertyValues = getTagsInfo(schema.tags, 'property');
  const requiredProperties = getRequiredProperties(propertyValues);
  if (!typedef || !typedef.name) return {};
  const {
    elements,
  } = typedef.type;
  return {
    [typedef.name]: {
      ...combineSchema(elements),
      description: schema.description,
      ...(requiredProperties.length ? {
        required: formatRequiredProperties(requiredProperties),
      } : {}),
      type: 'object',
      properties: formatProperties(propertyValues, options),
    },
  };
};

const parseComponents = (swaggerObject = {}, components = [], options = {}) => {
  if (!components || !Array.isArray(components)) return { components: { schemas: {} } };
  const componentSchema = components.reduce((acum, item) => ({
    ...acum, ...parseSchema(item, options),
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
