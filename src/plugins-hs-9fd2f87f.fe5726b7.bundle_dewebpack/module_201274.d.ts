/**
 * CSS Module Loader Type Definition
 * 
 * This module exports CSS styles for a tooltip component within a toolitem.
 * The styles are injected into the page via a CSS loader (webpack css-loader).
 */

/**
 * CSS Module Loader Function
 * 
 * Represents a webpack module that loads and injects CSS styles into the application.
 * 
 * @param exports - The module exports object where the CSS content will be attached
 * @param require - The webpack require function for loading dependencies
 * @param cssLoader - The CSS loader function (module 986380) that processes CSS content
 */
declare function cssModuleLoader(
  exports: CssModuleExports,
  require: WebpackRequire,
  cssLoader: CssLoaderFunction
): void;

/**
 * CSS Loader Function Type
 * 
 * @param sourceMap - Whether to include source maps for the CSS
 * @returns A CSS loader instance with a push method for adding style rules
 */
interface CssLoaderFunction {
  (sourceMap: boolean): CssLoaderInstance;
}

/**
 * CSS Loader Instance
 * 
 * Provides methods to register CSS content
 */
interface CssLoaderInstance {
  /**
   * Adds a CSS rule to the loader
   * 
   * @param rule - Tuple containing [moduleId, cssContent, sourceMap?, media?, other?]
   */
  push(rule: [string | number, string, string?, string?, unknown?]): void;
}

/**
 * Module Exports Object
 */
interface CssModuleExports {
  /** Module identifier */
  id: string | number;
  /** Exported content (CSS loader instance) */
  exports?: CssLoaderInstance;
}

/**
 * Webpack Require Function
 * 
 * @param moduleId - The ID of the module to require
 * @returns The required module's exports
 */
interface WebpackRequire {
  (moduleId: number | string): unknown;
}

/**
 * Tooltip Styles Configuration
 * 
 * This module defines CSS styles for a tooltip component with the following structure:
 * - `.toolitem .tip-wrap`: Main tooltip container with light gray background
 * - `.toolitem .tip-wrap .tip-body`: Tooltip content area
 * - `.toolitem .tip-wrap::after`: Arrow/pointer element at the top
 * - `.toolitem .tip-wrap .nomore-show`: "Don't show again" action link
 */
export interface TooltipStyles {
  /** Main tooltip wrapper positioned absolutely below the toolitem */
  tipWrap: CSSStyleDeclaration;
  /** Tooltip content body with gray text */
  tipBody: CSSStyleDeclaration;
  /** Upward-pointing triangle arrow created with borders */
  tipWrapAfter: CSSStyleDeclaration;
  /** Interactive "no more show" link with hover underline */
  nomoreShow: CSSStyleDeclaration;
}

export default cssModuleLoader;