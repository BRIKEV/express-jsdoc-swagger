const mapDescription = require('./mapDescription');
const errorMessage = require('./errorMessage');

const ENUM_IDENTIFIER = 'enum:';
const JSON_IDENTIFIER = 'json:';
const DESCRIPTION_DIVIDER = ' - ';

const formatDescription = description => {
  const descriptionTypes = mapDescription(description);
  const descriptionValue = descriptionTypes.filter(value => (
    !value.includes(ENUM_IDENTIFIER) && !value.includes(JSON_IDENTIFIER)
  )).join(DESCRIPTION_DIVIDER);
  const enumOption = descriptionTypes.find(value => value.includes(ENUM_IDENTIFIER));
  const jsonOption = descriptionTypes.find(value => value.includes(JSON_IDENTIFIER));
  const res = [descriptionValue];
  if (enumOption) {
    const [, enumOptions] = enumOption.split('enum:');
    const enumValues = enumOptions.split(',');
    res.push(enumValues);
  } else {
    res.push(undefined);
  }
  if (jsonOption) {
    try {
      const jsonOptions = JSON.parse(jsonOption.slice(JSON_IDENTIFIER.length));
      if (typeof jsonOptions !== 'object') { throw new Error('options must be object'); }
      res.push(jsonOptions);
    } catch (err) {
      errorMessage(`json options are malformed: ${err.message}`);
    }
  }
  return res;
};

module.exports = formatDescription;
