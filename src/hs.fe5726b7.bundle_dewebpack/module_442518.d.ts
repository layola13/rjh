/**
 * Asset path constant for iconfont EOT file
 * This module exports the public path to the EOT font asset with specific timestamp
 */

/**
 * The public URL path to the iconfont EOT (Embedded OpenType) font file.
 * Used for IE6-IE8 compatibility in web font loading.
 * 
 * @constant
 * @type {string}
 * @example
 * // Returns something like: "/static/assets/iconfont.7586f758.eot?t=1541672292289"
 */
export declare const ICONFONT_EOT_PATH: string;

/**
 * Default export of the iconfont EOT asset path
 * Constructed from the webpack public path and the hashed filename
 * 
 * @default "assets/iconfont.7586f758.eot?t=1541672292289"
 */
declare const iconfontEotAssetPath: string;

export default iconfontEotAssetPath;