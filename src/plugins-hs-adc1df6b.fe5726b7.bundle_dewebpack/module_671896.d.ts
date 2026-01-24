/**
 * CSS module loader function type definition
 * This module exports CSS styles for property bar and message picture components
 * 
 * @module CSSModuleExport
 */

/**
 * Webpack module function signature
 * @param exports - The exports object to be populated
 * @param module - The current module object
 * @param require - The require function for loading dependencies
 */
type WebpackModuleFunction = (
  exports: CSSModuleExports,
  module: WebpackModule,
  require: WebpackRequire
) => void;

/**
 * Webpack module interface
 */
interface WebpackModule {
  /** Unique module identifier */
  id: string | number;
  /** Module exports object */
  exports: CSSModuleExports;
  /** Whether the module has been loaded */
  loaded?: boolean;
}

/**
 * CSS module exports interface
 * Contains the push method for adding CSS content to the stylesheet
 */
interface CSSModuleExports {
  /**
   * Adds CSS content to the stylesheet array
   * @param content - Array containing module ID and CSS string
   */
  push(content: [string | number, string]): void;
}

/**
 * Webpack require function type
 * Used to load other modules by their ID
 */
type WebpackRequire = (moduleId: number) => any;

/**
 * CSS content tuple type
 * [0] - Module ID
 * [1] - CSS styles as string
 */
type CSSContent = [string | number, string];

/**
 * The CSS styles exported by this module
 * Includes styles for:
 * - .propertybar-container .detail-card - Detail card container with inline display and pointer cursor
 * - .detail-info - Detail information text with gray color
 * - .detail-icon - Icon styling with hover/active states
 * - .msg-picture - Message picture container with fixed width, padding, and shadow
 */
declare const cssModuleExport: WebpackModuleFunction;

export default cssModuleExport;