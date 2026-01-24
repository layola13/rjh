/**
 * Webpack asset module that exports the path to a curtain pole SVG image.
 * This module represents a static asset reference that Webpack processes during bundling.
 * 
 * @module CurtainPoleAsset
 */

/**
 * The public path to the curtain pole SVG asset.
 * This path is resolved by the bundler and points to the final location of the asset
 * in the distribution directory.
 * 
 * @constant
 * @type {string}
 * @example
 * // Usage in a component
 * import curtainPoleImage from './curtain_pole_asset';
 * <img src={curtainPoleImage} alt="Curtain Pole" />
 */
declare const curtainPoleAssetPath: string;

export default curtainPoleAssetPath;