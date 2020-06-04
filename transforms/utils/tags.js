const getTagInfo = (tags, key) => tags.find(({ title }) => title === key);

const getTagsInfo = (tags, key) => tags.filter(({ title }) => title === key);

const formatDescriptionTag = desc => {
  const [name, description] = desc.split(' - ');
  return { name, description };
};

module.exports = {
  getTagInfo,
  getTagsInfo,
  formatDescriptionTag,
};
