/**
 * Asset module that exports the path to a crown image asset.
 * This module represents a static asset reference that would typically be handled
 * by a bundler's asset management system.
 */

/**
 * The file path to the crown PNG image asset.
 * This path is relative to the application's public assets directory.
 * 
 * @constant
 * @type {string}
 * @example
 * // Usage in a component
 * import crownImagePath from './crown-asset';
 * <img src={crownImagePath} alt="Crown" />
 */
declare const crownAssetPath: string;

export default crownAssetPath;