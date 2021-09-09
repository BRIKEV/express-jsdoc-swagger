const { flatArray } = require('../utils/arrays');

const AND_SEPARATOR = ' & ';
const OR_SEPARATOR = ' | ';

const formatOrValues = ({ description }) => {
  if (!description) { return []; }

  const securityNames = description.split(OR_SEPARATOR);
  return securityNames.map(names => ({
    description: names,
  }));
};

const formatSecurity = (securityValues = []) => (
  flatArray(securityValues
    .map(formatOrValues))
    .map(({ description }) => {
      const securityNames = description.split(AND_SEPARATOR);
      return {
        ...securityNames.reduce((acum, names) => (
          {
            ...acum,
            [names]: [],
          }
        ), {}),
      };
    })
);

module.exports = formatSecurity;
