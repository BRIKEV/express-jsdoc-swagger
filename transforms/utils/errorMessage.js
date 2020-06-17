const chalk = require('chalk');

const errorMessage = message => {
  // eslint-disable-next-line
  console.warn(chalk.yellow(`[express-jsdoc-swagger] ${message}`));
};

module.exports = errorMessage;
