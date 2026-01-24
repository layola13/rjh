/**
 * SVG asset module
 * Exports the public URL path for an SVG icon resource
 * @module IconAsset
 */

/**
 * The public URL path to the SVG icon asset
 * This path is resolved at build time by the bundler
 * @constant
 * @type {string}
 * @example
 * import iconPath from './icon-asset';
 * // iconPath === "/static/f438486983519b774fee.svg"
 */
declare const iconAssetPath: string;

export default iconAssetPath;