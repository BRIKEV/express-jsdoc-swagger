
const getSchema = type => {
  let schema = {
    type: type.name,
  };
  const notPrimitiveType = !type.name;
  if (notPrimitiveType) {
    const items = type.applications || {};
    const parseItems = items.reduce((itemAcc, itemTypes) => ({
      ...itemAcc,
      type: itemTypes.name,
    }), {});
    schema = {
      ...schema,
      type: type.expression.name,
      items: parseItems,
    };
  }
  return schema;
};

module.exports = getSchema;
