const { init } = require('express-oas-validator');

const validators = instance => new Promise((resolve, reject) => {
  instance.on('finish', (swaggerDef) => {
    const { validateRequest, validateResponse } = init(swaggerDef);
    resolve({ validateRequest, validateResponse });
  });

  instance.on('error', (error) => {
    reject(error);
  });
});

module.exports = validators;
