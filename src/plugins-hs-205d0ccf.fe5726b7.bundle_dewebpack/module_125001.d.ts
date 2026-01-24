/**
 * Webpack CSS module loader export
 * This module exports CSS styles for the spark-pic-modal component
 * @module SparkPicModalStyles
 */

/**
 * Webpack module loader function type
 * @param e - Module exports object
 * @param t - Module metadata/context
 * @param n - Webpack require function for loading dependencies
 */
declare function webpackModule(
  e: WebpackModuleExports,
  t: WebpackModuleMetadata,
  n: WebpackRequireFunction
): void;

/**
 * Webpack module exports interface
 */
interface WebpackModuleExports {
  /** Module ID */
  id: string | number;
  /** Module exports object */
  exports: CssModuleExports;
}

/**
 * CSS module exports interface returned by css-loader
 */
interface CssModuleExports {
  /**
   * Push CSS content to the style array
   * @param content - Array containing module ID and CSS string
   */
  push(content: [string | number, string]): void;
}

/**
 * Webpack module metadata
 */
interface WebpackModuleMetadata {
  /** Module identifier */
  id?: string | number;
  /** Module loaded flag */
  loaded?: boolean;
  /** Hot module replacement data */
  hot?: unknown;
}

/**
 * Webpack require function type
 * Used to load other modules by their numeric ID
 * @param moduleId - The numeric ID of the module to require
 * @returns The css-loader function that creates exportable CSS modules
 */
interface WebpackRequireFunction {
  (moduleId: number): CssLoaderFunction;
}

/**
 * CSS loader function that processes CSS content
 * @param sourceMap - Whether to include source maps
 * @returns Object with push method for adding CSS rules
 */
type CssLoaderFunction = (sourceMap: boolean) => CssModuleExports;

/**
 * CSS content for spark-pic-modal component
 * Includes styles for:
 * - Modal content background and borders
 * - Close button positioning and hover states
 * - Modal body padding and title styles
 * - Confirm dialog button styles
 * - Custom popover component styles
 */
declare const cssContent: string;

export = webpackModule;