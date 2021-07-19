const express = require('express');
const expressJSDocSwagger = require('../../..');

const app = express();

const setupInstance = options => new Promise(resolve => {
  const instance = expressJSDocSwagger(app)(options);
  instance.on('finish', data => {
    resolve(data);
  });
});

module.exports = setupInstance;
