const chalk = require('chalk');

const setProperty = entity => {
  const requiredError = (key, item) => new Error(`Key ${key} is required in item ${JSON.stringify(item)} for Entity ${entity}`);

  // eslint-disable-next-line
  const warnType = (type, value) => console.warn(chalk.yellow(`${type} is not valid with value ${value} for Entity ${entity}`));

  return (item, key, options) => {
    if (!item || !key || !options) {
      const requiredParamsError = new Error('item, key and options para are required');
      throw requiredParamsError;
    }
    const value = item[key];
    if (options.required && value === undefined) throw requiredError(key, item);
    if (value === undefined || value === null) return options.defaultValue;
    // eslint-disable-next-line
    if (typeof (value) !== options.type) warnType(options.type, value);
    return value;
  };
};

module.exports = setProperty;
