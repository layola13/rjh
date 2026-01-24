/**
 * SVG asset module that exports the public path to a "new" icon.
 * 
 * @module AssetModule
 * @description This module provides access to a static SVG asset file.
 * The asset is bundled and made available at a specific public path.
 */

/**
 * The public URL path to the "new" icon SVG asset.
 * 
 * @type {string}
 * @constant
 * @example
 * // Import and use the asset path
 * import newIconPath from './new-icon-module';
 * const img = document.createElement('img');
 * img.src = newIconPath;
 */
declare const assetPath: string;

export default assetPath;