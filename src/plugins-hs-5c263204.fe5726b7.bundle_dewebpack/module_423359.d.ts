/**
 * CSS module loader declaration
 * Module: module_423359
 * Original ID: 423359
 * 
 * This module exports CSS styles for feedback textarea components,
 * including styles for the homestyler UI textarea component with
 * light and dark theme variants.
 */

/**
 * Webpack module definition function signature
 * @param exports - The module exports object
 * @param module - The module metadata object containing id and other properties
 * @param require - The webpack require function for loading dependencies
 */
declare module "module_423359" {
  /**
   * Module metadata interface
   */
  interface Module {
    /** Unique module identifier */
    id: string | number;
    /** Module exports object */
    exports: unknown;
  }

  /**
   * CSS loader result interface
   */
  interface CSSLoaderResult {
    /**
     * Push CSS content to the loader
     * @param content - Array containing module id and CSS string
     */
    push(content: [string | number, string]): void;
  }

  /**
   * CSS loader factory function type
   * @param sourceMap - Whether to include source maps
   * @returns CSS loader result object
   */
  type CSSLoaderFactory = (sourceMap: boolean) => CSSLoaderResult;

  /**
   * Webpack require function type
   * @param moduleId - The module identifier to require
   * @returns The required module (CSSLoaderFactory in this case)
   */
  type WebpackRequire = (moduleId: number) => CSSLoaderFactory;

  /**
   * Module factory function that loads and registers CSS styles
   * @param module - Module object with id and exports
   * @param exports - Module exports object
   * @param require - Webpack require function
   */
  export default function (
    module: Module,
    exports: unknown,
    require: WebpackRequire
  ): void;
}