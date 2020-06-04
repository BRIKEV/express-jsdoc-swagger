const { getTagsInfo } = require('../utils/tags');
const { flatArray, getIndexBy } = require('../utils/arrays');

const FILTER_TAG_KEY = 'name';

const formatTags = ({ tags = [] }) => {
  const infoTags = getTagsInfo(tags, 'tags');
  return infoTags.map(tag => {
    const [name, description] = tag.description.split(' - ');
    return {
      name,
      description: description || '',
    };
  });
};

const filterDuplicateTags = tags => (
  tags.filter(({ name }, i) => getIndexBy(tags, FILTER_TAG_KEY, name) === i)
);

const parseTags = (swaggerObject = {}, data) => {
  if (!data || !Array.isArray(data)) return { tags: [] };
  const tags = flatArray(data.map(formatTags));
  const uniqTags = filterDuplicateTags(tags);
  return {
    ...swaggerObject,
    tags: uniqTags,
  };
};

module.exports = parseTags;
