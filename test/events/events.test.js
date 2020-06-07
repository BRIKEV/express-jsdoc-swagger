const swaggerEvents = require('../../swaggerEvents');

describe('swaggerEvents event emitter', () => {
  it('should return one instance', () => {
    const instance = swaggerEvents();
    const newInstance = swaggerEvents();
    expect(instance).toEqual(newInstance);
  });

  it('should handle error events', done => {
    const events = swaggerEvents();

    const error = 'Example error';

    events.instance.on('error', errorInfo => {
      expect(errorInfo).toEqual(error);
      done();
    });

    events.error(error);
  });

  it('should handle process info events', done => {
    const events = swaggerEvents();

    const message = 'Example message';

    events.instance.on('process', errorInfo => {
      expect(errorInfo).toEqual(message);
      done();
    });

    events.processFile(message);
  });

  it('should handle finish info events', done => {
    const events = swaggerEvents();

    const message = 'Example message';

    events.instance.on('finish', errorInfo => {
      expect(errorInfo).toEqual(message);
      done();
    });

    events.finish(message);
  });
});
