/**
 * CSS module declaration for input widgets component
 * @module InputWidgetsStyles
 */

/**
 * Webpack CSS loader module export function type
 * @param exports - The module exports object
 * @param require - The webpack require function
 * @param moduleLoader - The webpack module loader utility function
 */
declare function cssModuleLoader(
  exports: CSSModuleExports,
  require: WebpackRequire,
  moduleLoader: CSSLoaderFunction
): void;

export = cssModuleLoader;

/**
 * CSS module exports interface
 */
interface CSSModuleExports {
  /** Module identifier */
  id: string | number;
  /** Module exports content */
  exports: unknown;
}

/**
 * Webpack require function interface
 */
interface WebpackRequire {
  /** 
   * Require a module by ID
   * @param moduleId - The module identifier to require
   */
  (moduleId: number | string): unknown;
}

/**
 * CSS loader function that processes CSS content
 * @param sourceMap - Whether to include source maps
 * @returns CSS loader instance with push method
 */
interface CSSLoaderFunction {
  (sourceMap: boolean): CSSLoader;
}

/**
 * CSS loader instance with array-like push method
 */
interface CSSLoader {
  /**
   * Push CSS content to the loader
   * @param entry - Tuple containing module ID and CSS string content
   */
  push(entry: [string | number, string]): void;
}

/**
 * CSS Module Styles for Input Widgets Component
 * 
 * Includes styles for:
 * - Base input widget container (.inputwidgets)
 * - Input states: disabled, focus, error, readonly
 * - Unit type display (.unit-type)
 * - Arrow controls (.arrowgroup)
 * - Plugin-specific overrides
 */
declare const styles: string;