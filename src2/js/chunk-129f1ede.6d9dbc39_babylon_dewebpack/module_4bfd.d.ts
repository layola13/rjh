/**
 * Webpack module for Handle image asset
 * 
 * This module exports the path to a static Handle image asset.
 * The image is processed by Webpack's asset pipeline and the final
 * path includes a content hash for cache-busting.
 * 
 * @module HandleImage
 * @since 1.0.0
 */

/**
 * Path to the Handle.png image asset
 * 
 * The exported string represents the public URL path to the Handle image.
 * The path format is: "img/Handle.[contenthash].png"
 * where [contenthash] is a hash generated from the file content (e.g., "51c327d6")
 * 
 * @example
 *