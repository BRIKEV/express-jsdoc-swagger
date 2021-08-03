/* eslint-disable no-console */
const chalk = require('chalk');
const processSwagger = require('../../../processSwagger');

test('should give a nice error message for parameters', async () => {
  const options = {
    info: {
      version: '1.0.0',
      title: 'Albums store',
      license: {
        name: 'MIT',
      },
    },
    filesPattern: './jsdoc-parameter-error.js',
    baseDir: __dirname,
  };
  global.console = { ...global.console, warn: jest.fn() };
  await processSwagger(options);
  expect(console.warn).toHaveBeenCalledTimes(2);
  expect(console.warn).toHaveBeenNthCalledWith(
    1,
    chalk.yellow('[express-jsdoc-swagger] Entity: @param could not be parsed. Value: "name.query.required" is wrong'),
  );
  expect(console.warn).toHaveBeenNthCalledWith(
    2,
    chalk.yellow('[express-jsdoc-swagger] Entity: @param could not be parsed. Value: "phone.param" is wrong'),
  );
});

test('should give a nice error message for requestBody', async () => {
  const options = {
    info: {
      version: '1.0.0',
      title: 'Albums store',
      license: {
        name: 'MIT',
      },
    },
    filesPattern: './jsdoc-requestBody-error.js',
    baseDir: __dirname,
  };
  global.console = { ...global.console, warn: jest.fn() };
  await processSwagger(options);
  expect(console.warn).toHaveBeenCalledTimes(1);
  expect(console.warn).toHaveBeenNthCalledWith(
    1,
    chalk.yellow('[express-jsdoc-swagger] If you want to add one @param as body you must provide "request.body" instead of body.body.required'),
  );
});
