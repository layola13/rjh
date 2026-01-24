/**
 * Ant Design Message Component Styles
 * 
 * This module exports CSS styles for the Ant Design Message component.
 * It includes styles for different message types (success, error, warning, info, loading),
 * animations, and RTL (right-to-left) support.
 * 
 * @module MessageStyles
 */

/**
 * CSS module loader function type
 * Used by webpack's css-loader to inject styles
 */
type CssLoaderFunction = (useSourceMap: boolean) => CssModule;

/**
 * CSS module export structure
 */
interface CssModule {
  /**
   * Pushes CSS content to the module
   * @param content - Array containing module ID and CSS string
   */
  push(content: [string, string]): void;
}

/**
 * Webpack module exports interface for CSS modules
 */
interface WebpackCssModuleExports {
  /** The CSS module loader instance */
  exports: CssModule;
  /** Unique module identifier */
  id: string;
}

/**
 * Webpack require function type
 * @param moduleId - The ID of the module to require
 * @returns The loaded CSS module function
 */
type WebpackRequire = (moduleId: number) => CssLoaderFunction;

/**
 * CSS Module Loader for Ant Design Message Component
 * 
 * This function is called by webpack to load and inject the CSS styles
 * for the Message component into the application.
 * 
 * @param moduleExports - The webpack module exports object
 * @param _unused - Unused parameter (typically webpack context)
 * @param webpackRequire - Webpack's require function for loading dependencies
 * 
 * @remarks
 * The CSS includes:
 * - Base message container styles (fixed positioning, z-index)
 * - Message notice content styles (inline-block, padding, shadows)
 * - Icon styles for different message types (success, error, warning, info, loading)
 * - Exit animations (MessageMoveOut keyframes)
 * - RTL (right-to-left) language support
 * 
 * @example
 *