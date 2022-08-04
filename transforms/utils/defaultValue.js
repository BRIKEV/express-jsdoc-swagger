const addDefaultValue = (value: string) => {
  if (value === "") return {};
  return { default: value };
};

module.exports = addDefaultValue;
