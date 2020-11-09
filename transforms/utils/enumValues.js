const addEnumValues = (values = []) => {
  if (values.length === 0) return {};
  return { enum: values };
};

module.exports = addEnumValues;
