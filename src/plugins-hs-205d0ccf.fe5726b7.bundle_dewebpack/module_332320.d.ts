/**
 * Webpack asset URL export module
 * 
 * This module exports the public URL path for a static SVG asset.
 * Typically used in build systems to reference bundled assets with cache-busting hashes.
 */

/**
 * The public URL path to the 'new' SVG asset.
 * 
 * The filename includes a content hash (51014a47) for cache invalidation.
 * When the asset content changes, the hash will change, forcing browsers to fetch the new version.
 * 
 * @example
 *