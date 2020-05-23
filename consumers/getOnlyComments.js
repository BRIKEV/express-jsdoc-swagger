const getComments = require('../utils/getComments');

const flat = array => [].concat(...array);

const getOnlyComments = files => {
  const comments = files.map(getComments);
  return flat(comments);
};

module.exports = getOnlyComments;
