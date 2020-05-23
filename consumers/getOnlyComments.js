const getComments = require('./utils/getComments');

const flat = array => [].concat(...array);

const trimComment = comment => comment.trim();

const removeSimpleComments = comment => (comment[0] === '/' && comment[1] !== '/');

const processComments = comment => {
  const trimedComments = trimComment(comment);
  return getComments(trimedComments);
};

const getOnlyComments = (files = []) => {
  if (!Array.isArray(files)) return [];
  const comments = files
    .map(processComments);
  return flat(comments).filter(removeSimpleComments);
};

module.exports = getOnlyComments;
