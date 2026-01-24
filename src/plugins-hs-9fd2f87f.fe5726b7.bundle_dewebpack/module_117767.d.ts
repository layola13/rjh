/**
 * Static asset module for m1 image
 * 
 * This module exports the URL path to a PNG image asset.
 * The image is processed by webpack and includes a content hash (9e9223c9)
 * for cache busting purposes.
 * 
 * @module assets/m1
 * @since 1.0.0
 */

/**
 * The public URL path to the m1.png image asset.
 * 
 * This path is resolved at build time by webpack and includes:
 * - The configured public path (webpack's `output.publicPath`)
 * - The asset filename with content hash for cache invalidation
 * 
 * @example
 *