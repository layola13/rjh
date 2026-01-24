/**
 * Webpack asset module that exports the path to a loading GIF image.
 * This module represents a static asset that has been processed by Webpack's asset/resource loader.
 * The original file is copied to the output directory with a content hash in the filename.
 * 
 * @module LoadingAsset
 */

/**
 * The public path to the loading GIF asset.
 * This path is relative to the application's public directory and includes a content hash
 * for cache busting purposes.
 * 
 * @type {string}
 * @example
 * // Import in a component
 * import loadingGif from './assets/loading';
 * // Use in an img tag
 * <img src={loadingGif} alt="Loading..." />
 */
declare const loadingAssetPath: string;

export default loadingAssetPath;