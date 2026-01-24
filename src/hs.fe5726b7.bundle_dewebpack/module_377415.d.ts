/**
 * Webpack asset module that exports the URL path to a ceiling SVG asset.
 * This module provides access to a statically imported SVG file that has been
 * processed by Webpack's asset pipeline and placed in the output directory.
 * 
 * @module CeilingAsset
 * @since 1.0.0
 */

/**
 * The public URL path to the ceiling SVG asset.
 * This path is resolved relative to Webpack's configured public path
 * and includes a content hash for cache busting.
 * 
 * @example
 *