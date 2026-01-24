/**
 * Asset URL export module
 * 
 * This module exports the URL path to a feature wall image asset.
 * The image is processed by the bundler and gets a content-hash filename
 * for cache busting purposes.
 * 
 * @module featurewall-asset
 */

/**
 * The URL path to the feature wall PNG image asset.
 * The filename includes a content hash (cadd1e1c) for cache invalidation.
 * 
 * @type {string}
 * @example
 *