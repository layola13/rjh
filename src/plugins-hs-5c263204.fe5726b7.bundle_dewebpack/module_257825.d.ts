/**
 * CSS Module Loader Type Definition
 * 
 * This module represents a webpack CSS module loader that exports CSS content
 * as a string array. The CSS is intended for the Homestyler UI feedback modal component.
 * 
 * @module FeedbackModalStyles
 */

/**
 * CSS Module Factory Function
 * 
 * This is a webpack module factory function that loads CSS content through a CSS loader.
 * 
 * @param exports - The module.exports object to be populated
 * @param module - The current module metadata object
 * @param require - The webpack require function for loading dependencies
 * 
 * @remarks
 * The CSS content includes styles for:
 * - `.feedback-entry-modal`: Modal container with 900px width
 * - `.feedback-entry-blocks`: Scrollable content area (395px height)
 * - `.feedback-entry-footer`: Footer with flex layout for actions and record link
 * - `.feedback-entry-footer-actions`: Action buttons styling (46px height, 18px spacing)
 * - `.feedback-entry-footer-record`: Clickable record link with primary blue color (#396efe)
 * - `.feedback-block-wrapper`: Block wrapper with bottom margin
 */
declare function cssModuleFactory(
  exports: CSSModuleExports,
  module: WebpackModule,
  require: WebpackRequire
): void;

/**
 * CSS Module Exports Interface
 * 
 * Represents the exports object for a CSS module in webpack.
 */
interface CSSModuleExports {
  /**
   * The exports property that will contain the CSS content array
   */
  exports: CSSContentArray;
}

/**
 * Webpack Module Metadata
 * 
 * Contains metadata about the current webpack module.
 */
interface WebpackModule {
  /**
   * Unique identifier for this module
   * @example 257825
   */
  id: string | number;
  
  /**
   * The exports object for this module
   */
  exports: unknown;
}

/**
 * Webpack Require Function
 * 
 * Function used to load other webpack modules by their ID.
 * 
 * @param moduleId - The ID of the module to require
 * @returns The exports of the required module
 */
interface WebpackRequire {
  (moduleId: number): CSSLoaderFunction;
}

/**
 * CSS Loader Function
 * 
 * The CSS loader module (ID: 986380) that processes CSS content.
 * 
 * @param sourceMap - Whether to include source maps (false in this case)
 * @returns An object with a push method to add CSS content
 */
interface CSSLoaderFunction {
  (sourceMap: boolean): CSSContentArray;
}

/**
 * CSS Content Array
 * 
 * Array structure used by webpack to store CSS module content.
 * Each entry is a tuple of [moduleId, cssContent, sourceMap?].
 */
interface CSSContentArray {
  /**
   * Adds a CSS content entry to the array
   * 
   * @param entry - Tuple containing [moduleId, cssContent, sourceMap?]
   */
  push(entry: [string | number, string, string?]): void;
}

/**
 * CSS Content Entry
 * 
 * Represents a single CSS content entry in the webpack CSS module system.
 */
type CSSContentEntry = [
  /** Module ID */
  moduleId: string | number,
  /** CSS content as a string */
  cssContent: string,
  /** Optional source map */
  sourceMap?: string
];

export { cssModuleFactory, CSSModuleExports, WebpackModule, WebpackRequire, CSSLoaderFunction, CSSContentArray, CSSContentEntry };