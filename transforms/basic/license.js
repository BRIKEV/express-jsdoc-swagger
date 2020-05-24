const setProperty = require('../utils/setProperty')('license');

const getContact = (options = {}) => ({
  name: setProperty(options, 'name', {
    type: 'string',
    required: true,
  }),
  url: setProperty(options, 'url', {
    type: 'string',
    defaultValue: '',
  }),
});

module.exports = getContact;
