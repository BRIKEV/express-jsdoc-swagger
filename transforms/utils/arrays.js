const flatArray = elements => (
  elements.reduce((acc, val) => acc.concat(val), [])
);

const getIndexBy = (elements, key, value) => (
  elements.findIndex(element => element[key] === value)
);

module.exports = {
  flatArray,
  getIndexBy,
};
