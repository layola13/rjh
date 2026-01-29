/**
 * Historical version list component styles module
 * 
 * This module exports CSS styles for the historical version list UI component,
 * including version items, preview thumbnails, tags, and popover displays.
 * 
 * @module HistoricalVersionListStyles
 */

/**
 * CSS loader module interface
 */
interface CSSLoaderModule {
  /**
   * Pushes CSS content to the style loader
   * @param content - Array containing module ID and CSS string
   */
  push(content: [string, string]): void;
}

/**
 * Webpack module interface
 */
interface WebpackModule {
  /** Module identifier */
  id: string;
  /** Module exports */
  exports: CSSLoaderModule;
}

/**
 * CSS loader factory function type
 * @param sourceMap - Whether to include source maps
 * @returns CSS loader module instance
 */
type CSSLoaderFactory = (sourceMap: boolean) => CSSLoaderModule;

/**
 * Module export function that registers historical version list styles
 * 
 * @param module - Webpack module object containing exports and ID
 * @param _exports - Module exports (unused)
 * @param requireFn - Webpack require function to load dependencies
 */
declare function exportHistoricalVersionStyles(
  module: WebpackModule,
  _exports: unknown,
  requireFn: (moduleId: number) => CSSLoaderFactory
): void;

/**
 * CSS content for historical version list component
 * 
 * Styles include:
 * - `.historical-version-list` - Main container with scrollable content
 * - `.history-img-cntr` - Image container with updated badge overlay
 * - `.historical-version-li` - Individual version list item with radio, preview, time, and tags
 * - `.historical-version-deadline` - Deadline divider with centered text
 * - `.historical-version-popover` - Popover component for enlarged preview images
 */
export const historicalVersionListStyles: string;

export default exportHistoricalVersionStyles;