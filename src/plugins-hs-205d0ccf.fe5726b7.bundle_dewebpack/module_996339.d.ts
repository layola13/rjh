/**
 * CSS module loader type definition
 * This module exports CSS styles for popover tooltip components
 */

/**
 * Webpack module loader function signature
 * @param e - Module exports object
 * @param t - Module metadata (unused in this module)
 * @param n - Webpack require function for loading dependencies
 */
type WebpackModuleLoader = (
  e: WebpackModuleExports,
  t: WebpackModuleMetadata,
  n: WebpackRequireFunction
) => void;

/**
 * Module exports object containing the exported values
 */
interface WebpackModuleExports {
  /** The exports property that will contain the loaded module */
  exports: unknown;
  /** Unique module identifier */
  id: string | number;
}

/**
 * Module metadata object (currently unused but part of webpack signature)
 */
interface WebpackModuleMetadata {
  [key: string]: unknown;
}

/**
 * Webpack require function type
 * @param moduleId - The ID of the module to require
 * @returns The required module's exports
 */
type WebpackRequireFunction = (moduleId: number) => CSSLoader;

/**
 * CSS loader interface that provides the push method for adding CSS rules
 */
interface CSSLoader {
  /**
   * Creates a CSS loader instance
   * @param sourceMap - Whether to generate source maps
   * @returns CSS loader with push capability
   */
  (sourceMap: boolean): {
    /**
     * Adds CSS content to the loader
     * @param rule - Array containing module ID and CSS content
     */
    push(rule: [string | number, string]): void;
  };
}

/**
 * CSS class names defined in this module
 */
declare const styles: {
  /** Main wrapper class for popover tooltip with general styling */
  'render-popover-tooltip-general': string;
  /** Modifier class for single item display */
  'max-one-item-class': string;
  /** Tooltip content container */
  'tooltip-content': string;
  /** Image group container with flex layout */
  'images-group': string;
  /** Individual image item wrapper */
  'image-item': string;
  /** Main image display area */
  'image-main': string;
  /** Image caption text */
  'image-caption': string;
  /** Dark theme wrapper for base popover */
  'base-popover-overwrap-dark': string;
};

export default styles;