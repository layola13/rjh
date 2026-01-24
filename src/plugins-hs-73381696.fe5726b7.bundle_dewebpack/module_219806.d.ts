/**
 * Marking background image asset
 * 
 * This module exports the URL path to the marking background PNG image asset.
 * The image is processed and bundled by the build system with a content hash
 * for cache busting purposes.
 * 
 * @module marking-bg-asset
 */

/**
 * URL path to the marking background image asset
 * 
 * Format: "assets/marking-bg.[contenthash].png"
 * The actual hash value is determined at build time based on file content.
 * 
 * @example
 *