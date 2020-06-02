const parseSecuritySchemas = require('../../../transforms/security');

describe('Transform security schemas', () => {
  it('Should return a security array with BasicAuth', () => {
    const input = {
      security: {
        BasicAuth: {
          type: 'http',
          scheme: 'basic',
        },
      },
    };
    const expected = {
      security: [
        {
          BasicAuth: [],
        },
      ],
    };
    const result = parseSecuritySchemas(input);
    expect(result).toEqual(expected);
  });

  it('Should return a security array with each security type', () => {
    const input = {
      security: {
        BasicAuth: {
          type: 'http',
          scheme: 'basic',
        },
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    };
    const expected = {
      security: [
        {
          BasicAuth: [],
        },
        {
          bearerAuth: [],
        },
      ],
    };
    const result = parseSecuritySchemas(input);
    expect(result).toEqual(expected);
  });
});
