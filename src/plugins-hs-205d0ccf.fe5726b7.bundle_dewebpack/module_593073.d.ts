/**
 * CSS Module Loader Type Definition
 * 
 * This module exports CSS styles for tooltip items component.
 * The styles are processed through a CSS loader (likely css-loader with module ID 986380).
 */

/**
 * CSS module export function type
 * 
 * @param sourceMap - Whether to include source maps (false in this case)
 * @returns A CSS loader instance with push method
 */
type CSSLoaderFunction = (sourceMap: boolean) => CSSLoader;

/**
 * CSS Loader interface
 * Handles CSS module content with hot module replacement support
 */
interface CSSLoader {
  /**
   * Pushes CSS content to the loader
   * 
   * @param content - Tuple containing module ID and CSS string
   */
  push(content: [string, string]): void;
}

/**
 * Webpack module context
 */
interface WebpackModule {
  /** Module identifier */
  id: string;
  
  /** Module exports object */
  exports: unknown;
}

/**
 * Webpack require function
 * 
 * @param moduleId - The ID of the module to require
 * @returns The required module's exports
 */
type WebpackRequire = (moduleId: number) => CSSLoaderFunction;

/**
 * CSS content for tooltip items component
 * 
 * Styles include:
 * - .tooltip-items: Flex container with end alignment
 * - .tooltip-item: Individual tooltip item with circular shape and hover effects
 */
declare const cssContent: string;

/**
 * Module factory function
 * Loads and registers CSS styles for the tooltip items component
 * 
 * @param module - The webpack module object
 * @param exports - The module's exports object
 * @param require - The webpack require function
 */
declare function moduleFactory(
  module: WebpackModule,
  exports: unknown,
  require: WebpackRequire
): void;

export { moduleFactory as default, CSSLoader, CSSLoaderFunction, WebpackModule, WebpackRequire };