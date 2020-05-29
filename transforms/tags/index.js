const formatTags = ({ tags = [] }) => tags.map(tag => {
  const [name, description] = tag.description.split(' - ');
  return {
    name,
    description,
  };
});

const getIndexByName = (tags, tagName) => tags.findIndex(({ name }) => name === tagName);

const filterDuplicateTags = tags => tags.filter(({ name }, i) => getIndexByName(tags, name) === i);

const flatTags = tags => tags.reduce((acc, val) => acc.concat(val), []);

const parseTags = (swaggerObject = {}, data) => {
  if (!data || !Array.isArray(data)) return { tags: [] };
  const tags = filterDuplicateTags(flatTags(data.map(formatTags)));
  return {
    ...swaggerObject,
    tags,
  };
};

module.exports = parseTags;
