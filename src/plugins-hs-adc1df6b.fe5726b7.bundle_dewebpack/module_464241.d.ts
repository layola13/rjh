/**
 * Video tutorial SVG asset module
 * Exports the public URL path to the video tutorial icon asset
 */

/**
 * Public URL path to the video tutorial SVG icon
 * Resolved at build time to include the content hash for cache busting
 * @example "assets/videotutorial.b2515c8d.svg"
 */
declare const videoTutorialAssetPath: string;

export default videoTutorialAssetPath;

/**
 * Type definition for SVG asset modules
 * Used when importing .svg files that are processed as static assets
 */
export type SvgAssetModule = string;