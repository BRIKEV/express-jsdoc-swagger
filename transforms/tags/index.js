const { getTagsInfo, formatDescriptionTag } = require('../utils/tags');
const { flatArray, getIndexBy } = require('../utils/arrays');

const FILTER_TAG_KEY = 'name';

const formatTags = ({ tags = [] }) => {
  const infoTags = getTagsInfo(tags, 'tags');
  return infoTags.map(({ description: tagDescription }) => {
    const { name, description = '' } = formatDescriptionTag(tagDescription);
    return {
      name,
      description,
    };
  });
};

const sortByDescription = tags => [...tags].sort((a, b) => {
  if (!a.description && b.description) {
    return 1;
  }
  return -1;
});

const sortTagsByName = tags => [...tags].sort((a, b) => ((a.name > b.name) ? 1 : -1));

const filterDuplicateTags = tags => (
  tags.filter(({ name }, i) => getIndexBy(tags, FILTER_TAG_KEY, name) === i)
);

const parseTags = (swaggerObject, data) => {
  if (!data || !Array.isArray(data)) return { tags: [] };
  const tags = flatArray(data.map(formatTags));
  const ordererTags = sortByDescription(tags);
  const uniqTags = filterDuplicateTags(ordererTags);
  return {
    ...swaggerObject,
    tags: sortTagsByName(uniqTags),
  };
};

module.exports = parseTags;
