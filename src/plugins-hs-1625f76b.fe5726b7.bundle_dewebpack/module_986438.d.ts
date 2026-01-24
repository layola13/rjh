/**
 * CSS Module Loader Type Definition
 * 
 * This module represents a webpack CSS loader that processes and exports CSS content.
 * The module uses css-loader to handle CSS imports and convert them into JavaScript modules.
 * 
 * @module CSSModuleLoader
 */

/**
 * CSS module factory function signature
 * 
 * @param exports - The module exports object that will contain the processed CSS
 * @param module - The current module metadata object
 * @param require - The webpack require function for loading dependencies
 */
type CSSModuleFactory = (
  exports: CSSModuleExports,
  module: WebpackModule,
  require: WebpackRequire
) => void;

/**
 * Webpack module metadata interface
 */
interface WebpackModule {
  /** Unique module identifier */
  id: string | number;
  /** Module exports object */
  exports: CSSModuleExports;
  /** Indicates if the module has been loaded */
  loaded?: boolean;
}

/**
 * CSS module exports interface
 * Contains the processed CSS content and utility methods
 */
interface CSSModuleExports {
  /**
   * Pushes CSS content into the style collection
   * 
   * @param cssEntry - Array containing module ID and CSS content
   */
  push(cssEntry: [string | number, string]): void;
  
  /** String representation of the CSS module */
  toString(): string;
  
  /** Additional export properties */
  [key: string]: unknown;
}

/**
 * Webpack require function interface
 * Used to load other modules within the webpack bundle
 */
interface WebpackRequire {
  /**
   * Loads a module by its ID
   * 
   * @param moduleId - The unique identifier of the module to load
   * @returns The exports of the loaded module
   */
  (moduleId: number | string): unknown;
  
  /** Cache of loaded modules */
  c?: Record<string | number, WebpackModule>;
}

/**
 * CSS Loader Function
 * 
 * This function is called by webpack's css-loader (module 986380) to process CSS content.
 * The CSS defines styles for an AIGC image search page error component with:
 * - Full-size centered error container with black background
 * - Error text with icon (17px) and white text
 * - Retry button with semi-transparent background and hover effects
 * 
 * @param sourceMap - Whether to include source maps (false in this case)
 * @returns A CSS loader instance with push method
 */
declare const cssModuleFactory: CSSModuleFactory;

export default cssModuleFactory;

/**
 * Component Style Classes
 * 
 * These are the CSS classes exported by this module:
 * - `.aigc-image-search-page-error` - Main error container (flex centered, full size, black bg)
 * - `.error-text-container` - Container for error message (flex, 40px bottom margin)
 * - `.error-icon` - Icon element (17px font size)
 * - `.error-text` - Error message text (white, 6px left margin)
 * - `.retry-button` - Retry button (30px height, semi-transparent bg with hover effect)
 */
export type CSSClassNames = 
  | 'aigc-image-search-page-error'
  | 'error-text-container'
  | 'error-icon'
  | 'error-text'
  | 'retry-button';