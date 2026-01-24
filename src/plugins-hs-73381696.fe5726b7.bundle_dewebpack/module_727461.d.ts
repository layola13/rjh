/**
 * Dynamic module aggregator that collects and merges default exports
 * from all modules matching the require.context pattern (274228).
 * 
 * This module uses Webpack's require.context to dynamically import
 * modules and concatenate their default exports into a single array.
 * 
 * @module ModuleAggregator
 */

/**
 * Type definition for a module context returned by require.context
 * Webpack-specific API for dynamic imports with pattern matching
 */
interface RequireContext {
  /**
   * Returns the list of all module keys (paths) that match the context
   * @returns Array of module path strings
   */
  keys(): string[];
  
  /**
   * Resolves and returns the module for a given key
   * @param key - The module path/key to resolve
   * @returns The resolved module object
   */
  (key: string): ModuleWithDefault;
  
  /**
   * Returns the module ID for a given key
   * @param key - The module path/key
   * @returns The webpack module ID
   */
  resolve(key: string): string | number;
  
  /**
   * The unique identifier for this context
   */
  id: string | number;
}

/**
 * Shape of a module that exports a default value
 * @template T - The type of the default export (defaults to unknown array)
 */
interface ModuleWithDefault<T = unknown[]> {
  /**
   * The default export from the module
   */
  default?: T;
}

/**
 * Aggregated array of all collected default exports.
 * Each module's default export is expected to be an array,
 * which gets concatenated into this aggregate collection.
 * 
 * @remarks
 * - Iterates through all modules from context 274228
 * - Filters out modules without a default export
 * - Concatenates all default arrays into a single result
 */
declare const aggregatedModules: unknown[];

export default aggregatedModules;