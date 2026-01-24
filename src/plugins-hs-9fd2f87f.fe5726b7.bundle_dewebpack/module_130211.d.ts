/**
 * Webpack CSS loader module export
 * @module CSSLoaderModule
 */

/**
 * CSS loader module factory function
 * @param exports - Module exports object
 * @param require - Module require function
 * @param __webpack_require__ - Webpack internal require function
 */
declare function cssLoaderModuleFactory(
  exports: ModuleExports,
  require: RequireFunction,
  __webpack_require__: WebpackRequire
): void;

/**
 * Module exports interface
 */
interface ModuleExports {
  /** Module identifier */
  id: string | number;
  /** Module exports value */
  exports: CSSModule;
}

/**
 * CSS module interface returned by css-loader
 */
interface CSSModule {
  /**
   * Push CSS content to the module
   * @param content - Array containing module ID and CSS string
   */
  push(content: [string | number, string]): void;
}

/**
 * Standard CommonJS require function
 */
interface RequireFunction {
  (moduleId: string | number): unknown;
}

/**
 * Webpack internal require function with additional capabilities
 */
interface WebpackRequire extends RequireFunction {
  /** Additional webpack-specific properties */
  [key: string]: unknown;
}

/**
 * CSS content for customized project management UI components
 * Contains styles for:
 * - .customized-pm: Main container with full-screen overlay
 * - .customized-pm-editPanel: Edit panel wrapper
 * - .customized-pm-editFrame: Edit frame container
 */
declare const CSS_CONTENT: string;

export { cssLoaderModuleFactory as default };