/**
 * Webpack asset module that exports the URL path to a 3D camera SVG icon.
 * This module represents a static asset reference that would typically be processed
 * by Webpack's asset/resource loader.
 * 
 * @module CameraAsset
 */

/**
 * The public URL path to the 3D camera SVG asset.
 * This path is resolved at build time by Webpack and includes cache-busting hash.
 * 
 * @example
 * import cameraIconUrl from './camera_3d.svg';
 * // cameraIconUrl === "assets/camera_3d.520eb6e8.svg"
 */
declare const assetUrl: string;

export default assetUrl;