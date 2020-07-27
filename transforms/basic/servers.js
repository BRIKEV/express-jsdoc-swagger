const setProperty = require('../utils/setProperty')('servers');

const setServer = (server = {}) => ({
  url: setProperty(server, 'url', {
    type: 'string',
    required: true,
  }),
  description: setProperty(server, 'description', {
    type: 'string',
    defaultValue: '',
  }),
  ...(server.variables ? { variables: server.variables } : {}),
});

const setServers = (servers = []) => {
  if (!servers || !Array.isArray(servers)) return [];
  return servers.map(setServer);
};

module.exports = setServers;
