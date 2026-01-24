/**
 * Webpack module loader function signature
 * 
 * @remarks
 * This represents a standard webpack module pattern where:
 * - The first parameter is the module's exports object
 * - The second parameter is the require function for importing dependencies
 * - The third parameter is the webpack internal utilities object
 * 
 * Original module ID: 17dc (module_17dc)
 * 
 * @param exports - The module exports object that will be populated with exported members
 * @param require - The webpack require function for loading other modules
 * @param webpackUtils - Internal webpack utilities and metadata for the module
 */
declare function webpackModule(
  exports: Record<string, unknown>,
  require: (moduleId: string) => unknown,
  webpackUtils: WebpackModuleUtils
): void;

/**
 * Webpack internal utilities interface
 * Provides metadata and helper functions for the current module
 */
interface WebpackModuleUtils {
  /** The module ID */
  i: string;
  /** Flag indicating if the module has been loaded */
  l: boolean;
  /** The exports object (reference to first parameter) */
  exports: Record<string, unknown>;
  /** Module metadata */
  id?: string;
  /** Flag for ES module */
  [key: string]: unknown;
}

export { webpackModule, WebpackModuleUtils };