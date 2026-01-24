/**
 * Asset module that exports the path to an intersection point SVG icon.
 * This module provides the URL to a static SVG asset used for representing
 * intersection points in the application's UI.
 * 
 * @module IntersectionPointAsset
 */

/**
 * The file path to the intersection point SVG asset.
 * This path is resolved relative to the application's public path
 * and points to a hashed SVG file for cache busting.
 * 
 * @constant {string} intersectionPointAssetPath - The URL path to the SVG asset
 * @example
 * import intersectionPointIcon from './intersectionPoint';
 * // intersectionPointIcon === "assets/intersectionPoint.dc5556db.svg"
 */
declare const intersectionPointAssetPath: string;

export default intersectionPointAssetPath;