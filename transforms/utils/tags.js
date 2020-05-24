const getTagInfo = (tags, key) => tags.find(({ title }) => title === key);

const getTagsInfo = (tags, key) => tags.filter(({ title }) => title === key);

module.exports = {
  getTagInfo,
  getTagsInfo,
};
