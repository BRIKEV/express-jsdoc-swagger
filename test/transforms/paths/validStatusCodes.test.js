const validStatusCodes = require('../../../transforms/paths/validStatusCodes');

test('Valid status codes snapshot', () => {
  expect(validStatusCodes).toMatchSnapshot();
});
