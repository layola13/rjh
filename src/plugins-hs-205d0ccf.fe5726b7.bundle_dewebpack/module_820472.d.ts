/**
 * Temproom7 SVG Asset Module
 * 
 * This module exports the URL path to the temproom7 SVG asset.
 * The asset is processed by webpack and the final path includes a content hash
 * for cache busting purposes.
 * 
 * @module temproom7-asset
 */

/**
 * URL path to the temproom7 SVG asset
 * 
 * @remarks
 * The actual path is resolved at build time by webpack and includes:
 * - Base public path from webpack configuration
 * - Asset filename with content hash (e.g., temproom7.cb141ec6.svg)
 * 
 * @example
 *