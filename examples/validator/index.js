const serverApp = require('./app')
const logger = require('../utils/logger');

const PORT = process.env.PORT || 4000;

serverApp()
  .then(app => 
    app.listen(PORT, () =>
      logger.info(`Listening PORT: ${PORT}`)
    ))
  .catch((err) => {
    logger.error(err);
    process.exit(1);
  });
