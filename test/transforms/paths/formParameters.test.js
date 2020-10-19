const jsdocInfo = require('../../../consumers/jsdocInfo');
const setPaths = require('../../../transforms/paths');

describe('form requestBody tests', () => {
  it('should add request body using form examples', () => {
    const jsodInput = [`
      /**
       * POST /api/v1/
       * @param {string} id.form.required - id description
       * @param {string} title.form.required - title description
       */
    `];
    const expected = {
      paths: {
        '/api/v1/': {
          post: {
            deprecated: false,
            summary: '',
            responses: {},
            tags: [],
            security: [],
            parameters: [],
            requestBody: {
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        description: 'id description',
                      },
                      title: {
                        type: 'string',
                        description: 'title description',
                      },
                    },
                    required: ['id', 'title'],
                  },
                },
              },
            },
          },
        },
      },
    };
    const parsedJSDocs = jsdocInfo()(jsodInput);
    const result = setPaths({}, parsedJSDocs);
    expect(result).toEqual(expected);
  });
});
