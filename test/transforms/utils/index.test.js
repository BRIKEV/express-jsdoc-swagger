const setProperty = require('../../../transforms/utils/setProperty');

describe('setProperty method', () => {
  it('should not allow empty configuration', () => {
    expect(() => {
      setProperty()();
    }).toThrow('item, key and options para are required');
  });
});
