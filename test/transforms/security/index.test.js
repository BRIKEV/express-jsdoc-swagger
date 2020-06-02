const parseSecuritySchemas = require('../../../transforms/security');

describe('Transform security schemas', () => {
  it('Should return a security array and securitySchemes within components field', () => {
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
      components: {
        securitySchemes: {
          BasicAuth: {
            type: 'http',
            scheme: 'basic',
          },
        },
      },
    };
    const result = parseSecuritySchemas(input);
    expect(result).toEqual(expected);
  });

  it('Should return a security array and securitySchemes, both with each security type', () => {
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
      components: {
        securitySchemes: {
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
      },
    };
    const result = parseSecuritySchemas(input);
    expect(result).toEqual(expected);
  });
});
