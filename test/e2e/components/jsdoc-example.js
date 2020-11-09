/**
 * A song
 * @typedef {object} Song
 * @property {string} title.required - The title
 * @property {string} artist - The artist
 * @property {number} year - The year - double
 */

/**
 * Author model
 * @typedef {object} Author
 * @property {string} name.required - Author name
 * @property {integer} age - Author age - int64
 */

/**
 * Album
 * @typedef {object} Album
 * @property {Song} firstSong
 * @property {Author} author
 */
