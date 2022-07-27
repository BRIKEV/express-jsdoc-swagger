const getBasicInfo = require('../../../transforms/basic');

describe('basic transform method', () => {
  it('should not allow empty configuration', () => {
    const input = undefined;
    expect(() => {
      getBasicInfo(input);
    }).toThrow('Key title is required in item {}');
  });

  it('should return error as version is required', () => {
    const input = {
      info: {
        title: 'API 1',
      },
      servers: [],
    };
    expect(() => {
      getBasicInfo(input);
    }).toThrow('Key version is required in item {"title":"API 1"} for Entity info');
  });

  it('should return info object', () => {
    const input = {
      extra: 'extra info',
      info: {
        title: 'API 1',
        version: '1.0.0',
      },
    };
    const expected = {
      extra: 'extra info',
      info: {
        title: 'API 1',
        version: '1.0.0',
        termsOfService: '',
        description: 'Add your description',
      },
      servers: [],
    };
    const result = getBasicInfo(input);
    expect(result).toEqual(expected);
  });

  it('should send warn type when type is not correct', () => {
    global.console = { ...global.console, warn: jest.fn() };
    const input = {
      extra: 'extra info',
      info: {
        title: 'API 1',
        version: '1.0.0',
        description: false,
      },
    };
    const expected = {
      extra: 'extra info',
      info: {
        title: 'API 1',
        version: '1.0.0',
        termsOfService: '',
        description: false,
      },
      servers: [],
    };
    const result = getBasicInfo(input);
    expect(result).toEqual(expected);
    // eslint-disable-next-line
    expect(console.warn).toHaveBeenCalled();
  });

  it('should throw error for invalid server', () => {
    const input = {
      info: {
        title: 'API 1',
        version: '1.0.0',
      },
      servers: [{ invalid: 'example' }],
    };
    expect(() => {
      getBasicInfo(input);
    }).toThrow('Key url is required in item {"invalid":"example"} for Entity servers');
  });

  it('should return valid configuration', () => {
    const input = {
      info: {
        title: 'API 1',
        version: '1.0.0',
      },
      servers: [{
        url: 'https://url.com',
        variables: {
          enum: ['300', '200'],
          default: 200,
        },
      }],
    };
    const expected = {
      info: {
        title: 'API 1',
        description: 'Add your description',
        termsOfService: '',
        version: '1.0.0',
      },
      servers: [
        {
          url: 'https://url.com',
          description: '',
          variables: {
            enum: ['300', '200'],
            default: 200,
          },
        },
      ],
    };
    const result = getBasicInfo(input);
    expect(result).toEqual(expected);
  });
});
