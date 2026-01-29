/**
 * Webpack module loader function type definition
 * 
 * This module exports CSS styles for a historical version modal component.
 * The styles are injected using a CSS loader utility.
 * 
 * @module HistoricalVersionStyles
 * @id 857024
 */

/**
 * Represents a CSS module entry with ID and content
 */
interface CSSModuleEntry {
  /** Unique identifier for this CSS module */
  id: string | number;
  /** CSS content as a string */
  content: string;
}

/**
 * CSS loader utility that returns a collection with a push method
 */
interface CSSLoader {
  /**
   * Adds CSS module entries to the collection
   * @param entry - Tuple containing module ID and CSS content string
   */
  push(entry: [string | number, string]): void;
}

/**
 * Webpack module exports interface
 */
interface WebpackModuleExports {
  /** The CSS loader instance or exported value */
  exports: CSSLoader | unknown;
}

/**
 * Module require function for loading dependencies
 * 
 * @param moduleId - The unique identifier of the module to require
 * @returns A function that accepts a boolean parameter and returns a CSSLoader
 */
type RequireFunction = (moduleId: number) => (flag: boolean) => CSSLoader;

/**
 * Webpack module factory function signature
 * 
 * @param module - The module object containing exports
 * @param exports - Direct reference to module.exports
 * @param require - Function to load other modules by ID
 */
type WebpackModuleFactory = (
  module: WebpackModuleExports,
  exports: unknown,
  require: RequireFunction
) => void;

/**
 * CSS content for historical version modal component
 * 
 * Includes styles for:
 * - `.historical-version-container` - Main container with 508px height
 * - `.historical-version-pagination` - Pagination controls styling
 * - `.ant-pagination-simple` - Ant Design simple pagination overrides
 * - `.upgrade-version-store` - Upgrade banner with gradient background
 * - `.historical-version-modal-footer` - Modal footer layout and buttons
 * - `.homestyler-modal-container` - Modal container overrides
 * 
 * @remarks
 * This CSS module is loaded via webpack's CSS loader (module 986380)
 * and uses Ant Design component class names with custom overrides.
 */
declare const historicalVersionStyles: WebpackModuleFactory;

export default historicalVersionStyles;