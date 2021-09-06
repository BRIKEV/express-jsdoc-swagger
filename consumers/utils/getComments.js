const COMMENTS_PATTERN = /((\/\*\*+[\s\S]*?\*\/)|(\/\*+.*\*\/)|^\/\/.*?[\r\n])[\r\n]*/gm;
const BREAK_LINE = /\n/g;

const getComments = text => {
  const comments = text.match(COMMENTS_PATTERN);
  if (comments) {
    const filterComments = comments.filter(comment => comment.match(BREAK_LINE));
    return filterComments.map(comment => comment.trim());
  }
  return [];
};

module.exports = getComments;
