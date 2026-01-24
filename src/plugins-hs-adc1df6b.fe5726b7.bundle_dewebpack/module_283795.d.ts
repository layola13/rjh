/**
 * Webpack asset module that exports the URL path to a static image asset.
 * This module represents a bundled PNG image resource that gets processed
 * by Webpack's asset/resource loader.
 * 
 * @module AssetModule
 */

/**
 * The public URL path to the mix.png image asset.
 * This path is resolved at build time by Webpack and includes the content hash
 * for cache busting (cf47675e).
 * 
 * @type {string}
 * @example
 * import mixImageUrl from './mix-asset-module';
 * // mixImageUrl === "assets/mix.cf47675e.png"
 */
declare const assetUrl: string;

export default assetUrl;