/**
 * Asset module export
 * 
 * Exports the URL path to the enterprise SVG asset.
 * This module represents a Webpack asset resource that has been processed
 * and moved to the output directory with a content hash in the filename.
 * 
 * @module EnterpriseAsset
 */

/**
 * The URL path to the enterprise.svg asset file.
 * The filename includes a content hash (651d8cf9) for cache busting.
 * 
 * @constant
 * @type {string}
 * @example
 * import enterpriseSvgPath from './enterprise-asset';
 * // enterpriseSvgPath === "assets/enterprise.651d8cf9.svg"
 */
declare const enterpriseAssetPath: string;

export default enterpriseAssetPath;