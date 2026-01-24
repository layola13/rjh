/**
 * Asset module that exports the path to the master_plus.png image.
 * This module provides the bundled asset URL for a PNG image file.
 * 
 * @module AssetModule
 */

/**
 * The public path URL to the master_plus.png image asset.
 * This path is resolved at build time and includes cache-busting hash.
 * 
 * @example
 * import masterPlusImageUrl from './assets/master_plus';
 * // masterPlusImageUrl === "assets/master_plus.aefe08d4.png"
 */
declare const assetUrl: string;

export default assetUrl;