/**
 * Webpack asset module export
 * Exports the URL path to the lightband flip SVG asset
 * 
 * @module AssetExport
 * @description This module provides the public URL for a static SVG asset.
 * In webpack builds, the asset path includes a content hash for cache busting.
 */

/**
 * Public URL path to the lightband flip SVG asset
 * @type {string}
 * @example
 * import lightbandFlipUrl from './lightband_flip.svg';
 * // lightbandFlipUrl = "/assets/lightband_flip.dbd470ac.svg"
 */
declare const assetUrl: string;

export default assetUrl;