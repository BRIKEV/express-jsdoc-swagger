const info = require('./info');
const servers = require('./servers');

const getBasicInfo = (swaggerObjet = {}) => ({
  ...swaggerObjet,
  info: { ...info(swaggerObjet.info) },
  servers: servers(swaggerObjet.servers),
});

module.exports = getBasicInfo;
