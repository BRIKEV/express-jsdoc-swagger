const mapDescription = require('./mapDescription');

const getTagInfo = (tags, key) => tags.find(({ title }) => title === key);

const getTagsInfo = (tags, key) => tags.filter(({ title }) => title === key);

const formatDescriptionTag = desc => {
  const [name, description] = mapDescription(desc);
  return { name, description };
};

module.exports = {
  getTagInfo,
  getTagsInfo,
  formatDescriptionTag,
};
