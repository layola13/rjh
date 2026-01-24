/**
 * SVG asset path for premium floating point model icon.
 * This module exports the webpack-resolved path to the premium model SVG asset.
 * 
 * @module PremiumModelAsset
 * @description Provides the URL path to the premium floating point model SVG icon
 * used in the application's UI for indicating premium features or models.
 */

/**
 * The resolved public path to the premium model SVG asset.
 * This path is relative to the application's public directory and includes
 * cache-busting hash for optimal browser caching.
 * 
 * @constant
 * @type {string}
 * @example
 * // Usage in React/Vue components:
 * import premiumModelIcon from './premium-model-asset';
 * <img src={premiumModelIcon} alt="Premium Model" />
 */
declare const premiumModelAssetPath: string;

export default premiumModelAssetPath;

/**
 * Alternative named export for explicit imports
 */
export { premiumModelAssetPath as PREMIUM_MODEL_ICON_PATH };