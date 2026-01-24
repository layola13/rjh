/**
 * Asset module that exports the path to a 'none' SVG icon.
 * This module provides a reference to a static SVG asset used throughout the application.
 * 
 * @module AssetNoneIcon
 */

/**
 * The public path to the 'none.svg' icon asset.
 * This path is resolved at build time and points to the bundled SVG file.
 * 
 * @remarks
 * The hash in the filename (fa155950) is used for cache busting.
 * The actual file is located in the assets directory of the build output.
 */
declare const noneIconPath: string;

export default noneIconPath;