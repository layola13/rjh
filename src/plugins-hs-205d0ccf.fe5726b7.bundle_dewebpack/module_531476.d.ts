/**
 * CSS Module Loader Type Definition
 * @module CSSModuleLoader
 * @description Type definitions for a webpack CSS module loader that exports CSS content as a string array
 */

/**
 * Represents a CSS module entry with identifier and content
 */
interface CSSModuleEntry {
  /** Unique identifier for the CSS module */
  id: string | number;
  /** CSS content as a string */
  content: string;
}

/**
 * CSS Module Loader function interface
 * @param sourceMap - Whether to include source maps in the output
 * @returns An object with a push method for adding CSS module entries
 */
interface CSSModuleLoader {
  /**
   * Adds a CSS module entry to the collection
   * @param entry - Tuple containing module ID and CSS content
   */
  push(entry: [string | number, string]): void;
}

/**
 * Webpack module exports interface
 */
interface WebpackModuleExports {
  /** The CSS module loader instance */
  exports: CSSModuleLoader;
  /** Module identifier */
  id: string | number;
}

/**
 * CSS loader factory function type
 * @param enableSourceMap - Flag to enable/disable source map generation
 * @returns CSS module loader instance
 */
type CSSLoaderFactory = (enableSourceMap: boolean) => CSSModuleLoader;

/**
 * Webpack require function for loading modules
 * @param moduleId - The ID of the module to require
 * @returns The loaded module's factory or exports
 */
type WebpackRequire = (moduleId: number) => CSSLoaderFactory;

/**
 * Webpack CSS module definition function
 * @param moduleExports - The module's exports object
 * @param require - Webpack's require function for loading dependencies
 * @param loaderFactory - Factory function that creates the CSS loader
 */
declare function cssModuleDefinition(
  moduleExports: WebpackModuleExports,
  _unusedExportsParam: unknown,
  require: WebpackRequire
): void;

export type { 
  CSSModuleEntry, 
  CSSModuleLoader, 
  CSSLoaderFactory, 
  WebpackModuleExports, 
  WebpackRequire 
};

export { cssModuleDefinition as default };