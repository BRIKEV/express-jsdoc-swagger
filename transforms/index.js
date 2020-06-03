const getBasicInfo = require('./basic');
const getSecuritySchemes = require('./security');
const getPaths = require('./paths');
const getComponents = require('./components');
const getTags = require('./tags');

module.exports = {
  getBasicInfo,
  getPaths,
  getComponents,
  getTags,
  getSecuritySchemes,
};
