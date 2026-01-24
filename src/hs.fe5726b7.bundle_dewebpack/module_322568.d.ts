/**
 * Webpack asset module that exports the URL path to an active favicon SVG image.
 * This module represents a static asset reference that gets resolved by the bundler.
 * 
 * @module FavIconAsset
 */

/**
 * The resolved public URL path to the active favicon SVG asset.
 * This path is computed by the bundler based on the public path configuration
 * and includes a content hash for cache busting.
 * 
 * @example "assets/new_fav_icon_active.d56ead76.svg"
 */
declare const favIconActivePath: string;

export default favIconActivePath;