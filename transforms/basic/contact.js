const setProperty = require('../utils/setProperty');

const getContact = (options = {}) => ({
  name: setProperty(options, 'name', {
    type: 'string',
    required: true,
  }),
  url: setProperty(options, 'url', {
    type: 'string',
    defaultValue: '',
  }),
  email: setProperty(options, 'email', {
    type: 'string',
    defaultValue: '',
  }),
});

module.exports = getContact;
