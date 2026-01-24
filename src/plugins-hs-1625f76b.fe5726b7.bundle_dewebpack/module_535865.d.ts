/**
 * Webpack asset module that exports the public path to a static SVG asset.
 * This module represents a bundled reference to 'lightband_notflip.svg'.
 */

/**
 * The public URL path to the lightband_notflip SVG asset.
 * 
 * This string contains the full path where the asset can be accessed,
 * including any configured public path prefix and content hash for cache busting.
 * 
 * @example
 * // Usage in a component
 * import lightbandSvgPath from './assets/lightband_notflip.svg';
 * const img = document.createElement('img');
 * img.src = lightbandSvgPath;
 */
declare const assetPath: string;

export default assetPath;