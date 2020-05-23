const info = require('./info');
const servers = require('./servers');

const getBasicInfo = (swaggerObjet = {}) => {
  const updatedOptions = {
    ...swaggerObjet,
    info: { ...info(swaggerObjet.info) },
    servers: servers(swaggerObjet.servers),
  };
  return updatedOptions;
};

module.exports = getBasicInfo;
