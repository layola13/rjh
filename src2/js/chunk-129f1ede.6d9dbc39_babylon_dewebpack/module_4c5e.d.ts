/**
 * Module: module_4c5e
 * Original module identifier from webpack bundle
 * 
 * @module module_4c5e
 */

/**
 * Webpack module function signature
 * 
 * @param exports - The module's exports object
 * @param module - The module metadata object containing exports and module information
 * @param require - The webpack require function for importing other modules
 */
declare function module_4c5e(
  exports: Record<string, unknown>,
  module: WebpackModule,
  require: WebpackRequire
): void;

/**
 * Webpack module metadata interface
 */
interface WebpackModule {
  /** The module's exports object */
  exports: Record<string, unknown>;
  /** The module identifier */
  id: string | number;
  /** Whether the module has been loaded */
  loaded: boolean;
}

/**
 * Webpack require function interface
 */
interface WebpackRequire {
  /** Load a module by its identifier */
  (moduleId: string | number): unknown;
  /** Cache of loaded modules */
  c: Record<string | number, WebpackModule>;
  /** The module cache */
  cache: Record<string | number, WebpackModule>;
}

export { module_4c5e, WebpackModule, WebpackRequire };