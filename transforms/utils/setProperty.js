
const requiredError = (key, item) => new Error(`Key ${key} is required in item ${JSON.stringify(item)}`);

const warnType = (type, value) => console.warn(`${type} is not valid with value ${value}`);

const setProperty = (item, key, options) => {
  const value = item[key];
  if (!item || !key || !options) {
    const requiredParamsError = new Error('item, key and options para are required');
    throw requiredParamsError;
  }
  if (options.required && !value) throw requiredError(key, item);
  // eslint-disable-next-line
  if (typeof (value) !== options.type) warnType(options.type, value);
  if (value === undefined) return options.defaultValue;
  return value;
};

module.exports = setProperty;
