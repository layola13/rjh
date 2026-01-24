/**
 * Webpack asset module that exports the URL path to a left arrow SVG icon.
 * This module is typically used for importing static assets in a bundled application.
 * 
 * @module LeftArrowAsset
 * @example
 * import leftArrowUrl from './left-arrow-asset';
 * // leftArrowUrl will be: "assets/left.84749365.svg"
 */

/**
 * The URL path to the left arrow SVG asset.
 * The hash (84749365) in the filename is used for cache busting.
 * 
 * @constant
 * @type {string}
 * @default "assets/left.84749365.svg"
 */
declare const leftArrowAssetUrl: string;

export default leftArrowAssetUrl;