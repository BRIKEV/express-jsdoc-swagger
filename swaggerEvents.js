const { EventEmitter } = require('events');

const ERROR_EVENT_NAME = 'error';
const PROCESS_EVENT_NAME = 'process';
const FINISH_EVENT_NAME = 'finish';

let instance = null;

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
  if (instance) return instance;
  instance = new EventEmitter();

  return {
    error: error(instance),
    processFile: processFile(instance),
    finish: finish(instance),
  };
};

module.exports = swaggerEvents;
