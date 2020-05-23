const path = require('path');
const parser = require('swagger-parser');
const swaggerUi = require('swagger-ui-express');
const glob = require('glob');
const readFile = require('./utils/readFile');
const getComments = require('./utils/getComments');

/**
 * Generator options
 * @typedef {Object} Options
 * @property {string} title - The title
 */

const readGlobFiles = (baseDir, filePath) => new Promise((resolve, reject) => {
  glob(path.resolve(baseDir, filePath), (err, files) => {
    if (err) {
      return reject(err);
    }
    const filterFiles = files.filter(file => !file.includes('node_modules'));
    return resolve(filterFiles);
  });
});

const readJsDocFiles = (baseDir, filePath) => new Promise((resolve, reject) => {
  readGlobFiles(baseDir, filePath)
    .then(files => {
      return resolve(files);
    })
    .catch(reject);
});

/**
 * @param  {instance} Express instance
 * @return {function} A constructor of expressJSDocSwagger
 */
const expressJSDocSwagger = app => {
  /**
   * @param  {object} options - Generator options
   * @return {object} swaggerInfo - Swagger compiled options
   */
  return options => {
    let swaggerObject = {
      openapi: options.openapi,
      info: options.info,
      paths: options.paths,
    };

    readJsDocFiles(options.baseDir, options.file)
      .then(files => {
        const filesInfo = files.map(file => readFile(file));
        return Promise.all(filesInfo);
      })
      .then(files => {
        const comments = files.map(getComments);
        console.log(comments);
      })
      .catch(err => console.log(err));

    parser.parse(options, (err, api) => {
      if (!err) {
        swaggerObject = api;
      }
    });

    app.use('/api-docs', (req, res, next) => {
      swaggerObject = {
        ...swaggerObject,
        host: req.get('host'),
      };
      req.swaggerDoc = swaggerObject;
      next();
    }, swaggerUi.serve, swaggerUi.setup());

    return swaggerObject;
  };
};

module.exports = expressJSDocSwagger;
