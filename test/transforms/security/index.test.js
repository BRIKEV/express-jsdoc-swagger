const parseSecuritySchemas = require('../../../transforms/security');

describe('Transform security schemas', () => {
  it('Should return a empty object with not securitySchemes', () => {
    const input = undefined;
    const expected = {
      components: {},
    };
    const result = parseSecuritySchemas(input);
    expect(result).toEqual(expected);
  });

  it('Should return a empty components object with not securitySchemes when security was not set', () => {
    const input = {
      info: {
        version: '1.0.0',
        title: 'Albums store',
        license: {
          name: 'MIT',
        },
      },
    };
    const expected = {
      info: {
        version: '1.0.0',
        title: 'Albums store',
        license: {
          name: 'MIT',
        },
      },
      components: {},
    };
    const result = parseSecuritySchemas(input);
    expect(result).toEqual(expected);
  });

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
