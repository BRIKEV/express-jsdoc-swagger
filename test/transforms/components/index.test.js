const jsdocInfo = require('../../../consumers/jsdocInfo');
const parseComponents = require('../../../transforms/components');

describe('parseComponents method', () => {
  it('should return empty array with not params', () => {
    const initialState = {};
    const components = undefined;
    const expected = {
      components: {
        schemas: {},
      },
    };
    const result = parseComponents(initialState, components);
    expect(result).toEqual(expected);
  });

  it('should return empty array with not an array as parameter', () => {
    const initialState = {};
    const components = 2;
    const expected = {
      components: {
        schemas: {},
      },
    };
    const result = parseComponents(initialState, components);
    expect(result).toEqual(expected);
  });

  it('Should parse jsdoc and return default value when there is no typedef', () => {
    const jsodInput = [`
      /**
       * A song
       * @property {string} title - The title
       * @property {string} artist - The artist
       * @property {number} year - The year
       */
    `];
    const expected = {
      components: {
        schemas: {},
      },
    };
    const parsedJSDocs = jsdocInfo()(jsodInput);
    const result = parseComponents({}, parsedJSDocs);
    expect(result).toEqual(expected);
  });

  it('Should parse jsdoc component spec with basic properties', () => {
    const jsodInput = [`
      /**
       * A song
       * @typedef {object} Song
       * @property {string} title - The title
       * @property {string} artist - The artist
       * @property {number} year - The year
       */
    `];
    const expected = {
      components: {
        schemas: {
          Song: {
            type: 'object',
            required: [],
            description: 'A song',
            properties: {
              title: {
                type: 'string',
                description: 'The title',
              },
              artist: {
                type: 'string',
                description: 'The artist',
              },
              year: {
                type: 'number',
                description: 'The year',
              },
            },
          },
        },
      },
    };
    const parsedJSDocs = jsdocInfo()(jsodInput);
    const result = parseComponents({}, parsedJSDocs);
    expect(result).toEqual(expected);
  });

  it('Should parse jsdoc component spec with require and format properties', () => {
    const jsodInput = [`
      /**
       * A song
       * @typedef {object} Song
       * @property {string} title.required - The title
       * @property {string} artist - The artist
       * @property {number} year - The year - int64
       */
    `];
    const expected = {
      components: {
        schemas: {
          Song: {
            type: 'object',
            required: [
              'title',
            ],
            description: 'A song',
            properties: {
              title: {
                type: 'string',
                description: 'The title',
              },
              artist: {
                type: 'string',
                description: 'The artist',
              },
              year: {
                type: 'number',
                description: 'The year',
                format: 'int64',
              },
            },
          },
        },
      },
    };
    const parsedJSDocs = jsdocInfo()(jsodInput);
    const result = parseComponents({}, parsedJSDocs);
    expect(result).toEqual(expected);
  });

  it('Should parse two jsdoc components', () => {
    const jsodInput = [`
      /**
       * A song
       * @typedef {object} Song
       * @property {string} title.required - The title
       * @property {string} artist - The artist
       * @property {number} year - The year - int64
       */
    `,
    `
      /**
       * Album
       * @typedef {object} Album
       * @property {string} name.required - Album name
       * @property {number} length
       */
    `];
    const expected = {
      components: {
        schemas: {
          Song: {
            type: 'object',
            required: [
              'title',
            ],
            description: 'A song',
            properties: {
              title: {
                type: 'string',
                description: 'The title',
              },
              artist: {
                type: 'string',
                description: 'The artist',
              },
              year: {
                type: 'number',
                description: 'The year',
                format: 'int64',
              },
            },
          },
          Album: {
            type: 'object',
            required: [
              'name',
            ],
            description: 'Album',
            properties: {
              name: {
                type: 'string',
                description: 'Album name',
              },
              length: {
                type: 'number',
                description: '',
              },
            },
          },
        },
      },
    };
    const parsedJSDocs = jsdocInfo()(jsodInput);
    const result = parseComponents({}, parsedJSDocs);
    expect(result).toEqual(expected);
  });

  it('Should parse one reference between two jsdoc components', () => {
    const jsodInput = [`
      /**
       * A song
       * @typedef {object} Song
       * @property {string} title.required - The title
       * @property {string} artist - The artist
       * @property {number} year - The year - int64
       */
    `,
    `
      /**
       * Album
       * @typedef {object} Album
       * @property {Song} firstSong
       */
    `];
    const expected = {
      components: {
        schemas: {
          Song: {
            type: 'object',
            required: [
              'title',
            ],
            description: 'A song',
            properties: {
              title: {
                type: 'string',
                description: 'The title',
              },
              artist: {
                type: 'string',
                description: 'The artist',
              },
              year: {
                type: 'number',
                description: 'The year',
                format: 'int64',
              },
            },
          },
          Album: {
            type: 'object',
            required: [],
            description: 'Album',
            properties: {
              firstSong: {
                $ref: '#/components/schemas/Song',
                description: '',
              },
            },
          },
        },
      },
    };
    const parsedJSDocs = jsdocInfo()(jsodInput);
    const result = parseComponents({}, parsedJSDocs);
    expect(result).toEqual(expected);
  });

  it('Should parse empty string when description is not defined', () => {
    const jsodInput = [`
      /**
       * A song
       * @typedef {object} Song
       * @property {string} title.required
       * @property {string} artist
       * @property {number} year
       */
    `,
    `
      /**
       * Album
       * @typedef {object} Album
       * @property {Song} firstSong
       */
    `];
    const expected = {
      components: {
        schemas: {
          Song: {
            type: 'object',
            required: [
              'title',
            ],
            description: 'A song',
            properties: {
              title: {
                type: 'string',
                description: '',
              },
              artist: {
                type: 'string',
                description: '',
              },
              year: {
                type: 'number',
                description: '',
              },
            },
          },
          Album: {
            type: 'object',
            required: [],
            description: 'Album',
            properties: {
              firstSong: {
                $ref: '#/components/schemas/Song',
                description: '',
              },
            },
          },
        },
      },
    };
    const parsedJSDocs = jsdocInfo()(jsodInput);
    const result = parseComponents({}, parsedJSDocs);
    expect(result).toEqual(expected);
  });

  it('Should parse two reference for one jsdoc component', () => {
    const jsodInput = [`
      /**
       * A song
       * @typedef {object} Song
       * @property {string} title.required - The title
       * @property {string} artist - The artist
       * @property {number} year - The year - int64
       */
    `,
    `
      /**
       * Author model
       * @typedef {object} Author
       * @property {string} name.required - Author name
       * @property {number} age - Author age - int64
       */
    `,
    `
      /**
       * Album
       * @typedef {object} Album
       * @property {Song} firstSong
       * @property {Author} author
       */
    `];
    const expected = {
      components: {
        schemas: {
          Song: {
            type: 'object',
            required: [
              'title',
            ],
            description: 'A song',
            properties: {
              title: {
                type: 'string',
                description: 'The title',
              },
              artist: {
                type: 'string',
                description: 'The artist',
              },
              year: {
                type: 'number',
                description: 'The year',
                format: 'int64',
              },
            },
          },
          Author: {
            type: 'object',
            required: [
              'name',
            ],
            description: 'Author model',
            properties: {
              name: {
                type: 'string',
                description: 'Author name',
              },
              age: {
                type: 'number',
                description: 'Author age',
                format: 'int64',
              },
            },
          },
          Album: {
            type: 'object',
            required: [],
            description: 'Album',
            properties: {
              firstSong: {
                $ref: '#/components/schemas/Song',
                description: '',
              },
              author: {
                $ref: '#/components/schemas/Author',
                description: '',
              },
            },
          },
        },
      },
    };
    const parsedJSDocs = jsdocInfo()(jsodInput);
    const result = parseComponents({}, parsedJSDocs);
    expect(result).toEqual(expected);
  });
});
