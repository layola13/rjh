/**
 * Webpack asset module - CAD guideline image
 * 
 * This module exports the URL path to a static PNG image asset.
 * The asset is processed by Webpack's asset/resource loader and
 * the exported string contains the final public path to the image file.
 * 
 * @module CustomizedModelingCadGuideline
 */

/**
 * Public URL path to the CAD guideline image asset.
 * 
 * The path is resolved at build time by Webpack and includes:
 * - The configured public path prefix
 * - The assets directory
 * - The filename with content hash for cache busting
 * 
 * @example
 *