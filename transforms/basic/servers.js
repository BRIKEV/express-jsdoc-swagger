const setProperty = require('../utils/setProperty')('servers');

const setVariables = variables => ({
  enum: setProperty(variables, 'enum', {
    type: 'array',
    required: true,
  }),
  default: setProperty(variables, 'default', {
    type: 'string',
    required: true,
  }),
  description: setProperty(variables, 'description', {
    type: 'string',
    defaultValue: '',
  }),
});

const setServer = (server = {}) => ({
  url: setProperty(server, 'url', {
    type: 'string',
    required: true,
  }),
  description: setProperty(server, 'description', {
    type: 'string',
    defaultValue: '',
  }),
  variables: server.variables ? server.variables.map(setVariables) : [],
});

const setServers = (servers = []) => {
  if (!servers || !Array.isArray(servers)) return [];
  return servers.map(setServer);
};

module.exports = setServers;
