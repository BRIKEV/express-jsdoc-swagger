const userSwagger = {
  openapi: '3.0.0',
  info: {
    title: 'Albums store',
    description: 'Add your description',
    contact: {},
    license: {
      name: 'MIT',
      url: ''
    },
    termsOfService: '',
    version: '1.0.0'
  },
  servers: [],
  components: {
    schemas: {}
  },
  paths: {
    '/users/{id}': {
      parameters: [
        {
          in: 'path',
          name: 'id',
          schema: {
            type: 'integer'
          },
          required: true,
          description: 'The user ID.'
        }
      ],
      delete: {
        summary: 'Deletes the user with the specified ID.',
        responses: {
          204: {
            description: 'User was deleted.'
          }
        }
      },
      get: {
        summary: 'Gets one or more users by ID.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            description: 'A comma-separated list of user IDs.',
            schema: {
              type: 'array',
              items: {
                type: 'integer'
              },
              minItems: 1
            },
            explode: false,
            style: 'simple'
          }
        ],
        responses: {
          200: {
            description: 'OK'
          }
        }
      }
    }
  },
  tags: []
}

module.exports = userSwagger;
