/**
 * Asset module that exports the path to the Bariol-Regular SVG font file.
 * This module provides the public URL path to the font asset after webpack processing.
 * 
 * @module FontAssets
 */

/**
 * The public path to the Bariol-Regular SVG font file.
 * This path is resolved by the build system and includes the content hash for cache busting.
 * 
 * @constant
 * @type {string}
 * @example
 * // Usage in a component
 * import bariolFontPath from './font-assets';
 * const fontUrl = bariolFontPath; // "assets/Bariol-Regular.06f96ba8.svg"
 */
declare const bariolFontPath: string;

export default bariolFontPath;