/**
 * CSS module loader type definition
 * 
 * This module exports a CSS stylesheet for a guided tour/walkthrough UI component.
 * The CSS is loaded through a webpack css-loader and defines styles for:
 * - Guide header container and wrapper
 * - Step indicators with numbers and descriptions
 * - Exit button with hover states
 * - Localization support for English (global-en)
 * 
 * @module GuideGlobalStyles
 */

/**
 * Webpack module context
 */
interface WebpackModuleExports {
  /** Module ID assigned by webpack */
  id: string | number;
  /** Module exports object */
  exports: unknown;
}

/**
 * CSS loader function that processes CSS content
 * 
 * @param sourceMap - Whether to include source maps (false in this case)
 * @returns CSS loader instance with push method
 */
type CSSLoaderFunction = (sourceMap: boolean) => CSSLoader;

/**
 * CSS loader instance that collects CSS rules
 */
interface CSSLoader {
  /**
   * Adds a CSS module to the collection
   * 
   * @param entry - Tuple containing module ID and CSS content
   *   - entry[0]: Module identifier (string or number)
   *   - entry[1]: CSS content as string
   */
  push(entry: [string | number, string]): void;
}

/**
 * Webpack require function for loading modules
 * 
 * @param moduleId - The numeric or string ID of the module to load
 * @returns The loaded module (CSSLoaderFunction in this context)
 */
type WebpackRequire = (moduleId: number | string) => CSSLoaderFunction;

/**
 * Module factory function signature used by webpack
 * 
 * @param module - The module object containing id and exports
 * @param exports - Direct reference to module.exports for convenience
 * @param require - Webpack's require function for loading dependencies
 */
declare function moduleFactory(
  module: WebpackModuleExports,
  exports: unknown,
  require: WebpackRequire
): void;

export default moduleFactory;

/**
 * CSS class names defined in this module:
 * 
 * @example
 *