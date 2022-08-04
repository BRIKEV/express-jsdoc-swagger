const addDefaultValue = (value) => {
  if (value === "") return {};
  return { default: value };
};

module.exports = addDefaultValue;
