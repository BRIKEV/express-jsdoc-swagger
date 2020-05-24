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
});
