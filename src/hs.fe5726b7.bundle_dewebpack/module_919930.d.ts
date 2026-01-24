/**
 * Asset module that exports the path to the front page SVG asset.
 * 
 * This module provides the public path to a static SVG asset used for the front page.
 * The asset is typically processed by a build tool and placed in the assets directory
 * with a content hash in the filename for cache busting.
 * 
 * @module FrontPageAsset
 */

/**
 * The public path to the front page SVG asset.
 * 
 * Format: "assets/front_page.[contenthash].svg"
 * The contenthash (e.g., "2f2f6a93") is generated based on file content
 * to enable long-term caching and automatic cache invalidation.
 * 
 * @example
 *