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
    };
    expect(() => {
      getBasicInfo(input);
    }).toThrow('Key version is required in item {"title":"API 1"}');
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
        contact: {},
        license: {},
        termsOfService: '',
        description: 'Add your description',
      },
    };
    const result = getBasicInfo(input);
    expect(result).toEqual(expected);
  });

  it('should send warn type when type is not correct', () => {
    global.console = { warn: jest.fn() };
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
        contact: {},
        license: {},
        termsOfService: '',
        description: false,
      },
    };
    const result = getBasicInfo(input);
    expect(result).toEqual(expected);
    // eslint-disable-next-line
    expect(console.warn).toHaveBeenCalled();
  });
});
