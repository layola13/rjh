/**
 * Asset module that exports the file path for a fingerprint image.
 * This module is typically used to import static assets in a bundled application.
 * 
 * @module AssetModule
 */

/**
 * The file path to the fingerprint image asset.
 * Points to a hashed PNG file in the assets directory.
 * 
 * @constant
 * @type {string}
 * @example
 * import fingerprintImagePath from './fp-asset-module';
 * // Returns: "assets/fp.cadafb60.png"
 */
declare const assetPath: string;

export default assetPath;