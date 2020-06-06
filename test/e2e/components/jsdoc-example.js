
/**
 * A song
 * @typedef {object} Song
 * @property {string} title.required - The title
 * @property {string} artist - The artist
 * @property {number} year - The year - int64
 */

/**
 * Author model
 * @typedef {object} Author
 * @property {string} name.required - Author name
 * @property {number} age - Author age - int64
 */

/**
 * Album
 * @typedef {object} Album
 * @property {Song} firstSong
 * @property {Author} author
 */
