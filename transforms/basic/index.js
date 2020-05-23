const info = require('./info');

const getBasicInfo = swaggerObjet => {
  const updatedOptions = {
    ...swaggerObjet,
    info: { ...info(swaggerObjet) },
  };
  return updatedOptions;
};

module.exports = getBasicInfo;
