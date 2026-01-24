/**
 * Asset module that exports the path to a left arrow image.
 * This module provides access to a static image asset used in the application UI.
 * 
 * @module AssetModule
 */

/**
 * The relative path to the left arrow PNG image asset.
 * This path is resolved relative to the application's public asset directory.
 * 
 * @type {string}
 * @example
 * // Import and use in a component
 * import leftArrowPath from './assets/left-arrow';
 * <img src={leftArrowPath} alt="Left arrow" />
 */
declare const leftArrowAssetPath: string;

export default leftArrowAssetPath;