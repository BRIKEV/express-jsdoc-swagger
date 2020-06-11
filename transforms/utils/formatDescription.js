const mapDescription = require('./mapDescription');

const ENUM_IDENTIFIER = 'enum:';
const DESCRIPTION_DIVIDER = ' - ';

const formatDescription = description => {
  const descriptionTypes = mapDescription(description);
  const descriptionValue = descriptionTypes.filter(value => (
    !value.includes(ENUM_IDENTIFIER)
  )).join(DESCRIPTION_DIVIDER);
  const enumOption = descriptionTypes.find(value => value.includes(ENUM_IDENTIFIER));
  if (!enumOption) {
    return [descriptionValue];
  }
  const [, enumOptions] = enumOption.split('enum:');
  const enumValues = enumOptions.split(',');
  return [descriptionValue, enumValues];
};

module.exports = formatDescription;
