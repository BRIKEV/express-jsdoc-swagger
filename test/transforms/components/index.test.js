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

  it('Should parse jsdoc component spec with enum properties', () => {
    const jsodInput = [`
      /**
       * A song
       * @typedef {object} Song
       * @property {string} title - The title
       * @property {string} artist - The artist - enum:value1,value2
       * @property {number} year - The year - int64
       */
    `];
    const expected = {
      components: {
        schemas: {
          Song: {
            type: 'object',
            description: 'A song',
            properties: {
              title: {
                type: 'string',
                description: 'The title',
              },
              artist: {
                type: 'string',
                description: 'The artist',
                enum: [
                  'value1',
                  'value2',
                ],
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

  it('Should parse jsdoc component spec with enum properties in different order', () => {
    const jsodInput = [`
      /**
       * A song
       * @typedef {object} Song
       * @property {string} title - The title
       * @property {string} artist - enum:value1,value2 - The artist
       * @property {number} year - The year - int64
       */
    `];
    const expected = {
      components: {
        schemas: {
          Song: {
            type: 'object',
            description: 'A song',
            properties: {
              title: {
                type: 'string',
                description: 'The title',
              },
              artist: {
                type: 'string',
                description: 'The artist',
                enum: [
                  'value1',
                  'value2',
                ],
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

  it('Should parse jsdoc component spec with json options', () => {
    const jsodInput = [`
      /**
       * A song
       * @typedef {object} Song
       * @property {string} title - The title
       * @property {string} artist - The artist - json:{"maxLength": 300}
       * @property {number} year - The year - int64 - json:{"minimum": 2000}
       */
    `];
    const expected = {
      components: {
        schemas: {
          Song: {
            type: 'object',
            description: 'A song',
            properties: {
              title: {
                type: 'string',
                description: 'The title',
              },
              artist: {
                type: 'string',
                description: 'The artist',
                maxLength: 300,
              },
              year: {
                type: 'number',
                description: 'The year',
                format: 'int64',
                minimum: 2000,
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

  it('Should parse jsdoc component spec when songs property is an array of strings', () => {
    const jsodInput = [`
      /**
       * Album
       * @typedef {object} Album
       * @property {string} title - The title
       * @property {array<string>} songs - songs array
       */
    `];
    const expected = {
      components: {
        schemas: {
          Album: {
            type: 'object',
            description: 'Album',
            properties: {
              title: {
                type: 'string',
                description: 'The title',
              },
              songs: {
                type: 'array',
                description: 'songs array',
                items: {
                  type: 'string',
                },
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

  it('Should parse jsdoc component spec when songs property is an array of numbers', () => {
    const jsodInput = [`
      /**
       * Album
       * @typedef {object} Album
       * @property {string} title - The title
       * @property {array<number>} years - years description
       */
    `];
    const expected = {
      components: {
        schemas: {
          Album: {
            type: 'object',
            description: 'Album',
            properties: {
              title: {
                type: 'string',
                description: 'The title',
              },
              years: {
                type: 'array',
                description: 'years description',
                items: {
                  type: 'number',
                },
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

  it('Should parse jsdoc component spec when songs property is an array of numbers with empty description', () => {
    const jsodInput = [`
      /**
       * Album
       * @typedef {object} Album
       * @property {string} title - The title
       * @property {array<number>} years
       */
    `];
    const expected = {
      components: {
        schemas: {
          Album: {
            type: 'object',
            description: 'Album',
            properties: {
              title: {
                type: 'string',
                description: 'The title',
              },
              years: {
                type: 'array',
                description: '',
                items: {
                  type: 'number',
                },
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

  it('Should parse an album schema with an array of Songs schemas.', () => {
    const jsodInput = [
      [`
        /**
         * Album
         * @typedef {object} Album
         * @property {array<Song>} Songs
         */
      `],
      [`
        /**
         * Album
         * @typedef {object} Album
         * @property {Array<Song>} Songs
         */
      `],
      [`
        /**
         * Album
         * @typedef {object} Album
         * @property {Song[]} Songs
         */
      `],
    ];
    const expected = {
      components: {
        schemas: {
          Album: {
            type: 'object',
            description: 'Album',
            properties: {
              Songs: {
                type: 'array',
                description: '',
                items: {
                  $ref: '#/components/schemas/Song',
                },
              },
            },
          },
        },
      },
    };
    jsodInput.forEach(jsod => {
      const parsedJSDocs = jsdocInfo()(jsod);
      const result = parseComponents({}, parsedJSDocs);
      expect(result).toEqual(expected);
    });
  });

  it('Should parse a SingleAlbum schema with allOf reference of Song.', () => {
    const jsodInput = [`
      /**
       * SingleAlbum
       * @typedef {allOf|Song} SingleAlbum
       * @property {array<Song>} Songs
       */
    `];
    const expected = {
      components: {
        schemas: {
          SingleAlbum: {
            allOf: [
              {
                $ref: '#/components/schemas/Song',
              },
            ],
            type: 'object',
            description: 'SingleAlbum',
            properties: {
              Songs: {
                type: 'array',
                description: '',
                items: {
                  $ref: '#/components/schemas/Song',
                },
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

  it('Should parse a SongOrAlbum schema with oneOf reference of Song and Album.', () => {
    const jsodInput = [`
      /**
       * SongOrAlbum
       * @typedef {oneOf|Song|Album} SongOrAlbum
       * @property {array<Song>} Songs
       */
    `];
    const expected = {
      components: {
        schemas: {
          SongOrAlbum: {
            oneOf: [
              {
                $ref: '#/components/schemas/Song',
              },
              {
                $ref: '#/components/schemas/Album',
              },
            ],
            type: 'object',
            description: 'SongOrAlbum',
            properties: {
              Songs: {
                type: 'array',
                description: '',
                items: {
                  $ref: '#/components/schemas/Song',
                },
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

  it('Should parse jsdoc component spec with optional properties nullable by default', () => {
    const jsdocInput = [`
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
                nullable: true,
              },
              year: {
                type: 'number',
                description: 'The year',
                format: 'int64',
                nullable: true,
              },
            },
          },
        },
      },
    };
    const parsedJSDocs = jsdocInfo()(jsdocInput);
    const result = parseComponents({}, parsedJSDocs, { notRequiredAsNullable: true });
    expect(result).toEqual(expected);
  });

  it('Should parse jsdoc component spec with string type', () => {
    const jsodInput = [`
      /**
       * A song
       * @typedef {string} Song
       */
    `];
    const expected = {
      components: {
        schemas: {
          Song: {
            type: 'string',
            description: 'A song',
          },
        },
      },
    };
    const parsedJSDocs = jsdocInfo()(jsodInput);
    const result = parseComponents({}, parsedJSDocs);
    expect(result).toEqual(expected);
  });

  it('Should parse jsdoc component spec with string type and a format', () => {
    const jsodInput = [`
      /**
       * A song - enum:value1,value2
       * @typedef {string} Song
       */
    `];
    const expected = {
      components: {
        schemas: {
          Song: {
            type: 'string',
            description: 'A song',
            enum: [
              'value1',
              'value2',
            ],
          },
        },
      },
    };
    const parsedJSDocs = jsdocInfo()(jsodInput);
    const result = parseComponents({}, parsedJSDocs);
    expect(result).toEqual(expected);
  });

  it('Should parse jsdoc component spec dictionary', () => {
    const jsodInput = [`
       /**
        * Profile
        * @typedef {object} Profile
        *
        * @property {string} email
        */
      `,
    `
       /**
        * Profiles dict
        * @typedef {Dictionary<Profile>} Profiles
        */
    `];
    const expected = {
      components: {
        schemas: {
          Profile: {
            type: 'object',
            description: 'Profile',
            properties: {
              email: {
                type: 'string',
                description: '',
              },
            },
          },
          Profiles: {
            type: 'object',
            description: 'Profiles dict',
            properties: {},
            additionalProperties: {
              $ref: '#/components/schemas/Profile',
            },
          },
        },
      },
    };
    const parsedJSDocs = jsdocInfo()(jsodInput);
    const result = parseComponents({}, parsedJSDocs);
    expect(result).toEqual(expected);
  });

  it('Should parse jsdoc component spec record type', () => {
    const jsodInput = [`
      /**
      * Records dict
      * @typedef {Dictionary<string>} Records map
      */
    `];
    const expected = {
      components: {
        schemas: {
          Records: {
            type: 'object',
            description: 'Records dict',
            properties: {},
            additionalProperties: {
              type: 'string',
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
