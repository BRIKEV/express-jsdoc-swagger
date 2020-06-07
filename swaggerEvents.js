const { EventEmitter } = require('events');

const ERROR_EVENT_NAME = 'error';
const PROCESS_EVENT_NAME = 'process';
const FINISH_EVENT_NAME = 'finish';

let api = null;

const error = eventEmitter => errorInfo => (
  eventEmitter.emit(ERROR_EVENT_NAME, errorInfo)
);

const processFile = eventEmitter => info => (
  eventEmitter.emit(PROCESS_EVENT_NAME, info)
);

const finish = eventEmitter => info => (
  eventEmitter.emit(FINISH_EVENT_NAME, info)
);

const swaggerEvents = () => {
  if (api) return api;
  const instance = new EventEmitter();

  api = {
    instance,
    error: error(instance),
    processFile: processFile(instance),
    finish: finish(instance),
  };

  return api;
};

module.exports = swaggerEvents;
