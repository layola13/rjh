/**
 * SVG asset module export
 * Exports the public path to the mask.svg asset file
 * 
 * @module AssetExport
 * @description This module provides access to a static SVG mask asset.
 * The asset path is resolved at build time and points to the compiled asset location.
 */

/**
 * Public path to the mask SVG asset
 * @type {string}
 * @constant
 * @example
 * import maskAssetPath from './mask-asset';
 * // maskAssetPath === "assets/mask.7f2323c8.svg"
 */
declare const maskAssetPath: string;

export default maskAssetPath;