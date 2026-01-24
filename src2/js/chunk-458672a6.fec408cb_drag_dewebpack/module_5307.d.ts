/**
 * Module: module_5307
 * Original Webpack Module ID: 5307
 * 
 * This is a placeholder module that was bundled by Webpack but contains no exported functionality.
 * It may have been used for side effects during the original build process or as a dependency placeholder.
 */

/**
 * Webpack module function signature
 * @param module - The module object used by Webpack for exports
 * @param exports - The exports object for this module
 * @param require - Webpack's require function for loading dependencies
 */
declare function module_5307(
  module: WebpackModule,
  exports: Record<string, unknown>,
  require: WebpackRequire
): void;

/**
 * Webpack module object interface
 */
interface WebpackModule {
  /** Module identifier */
  id: string | number;
  /** Module exports */
  exports: Record<string, unknown>;
  /** Whether the module has been loaded */
  loaded: boolean;
}

/**
 * Webpack require function interface
 */
interface WebpackRequire {
  /** Load a module by ID */
  (id: string | number): unknown;
  /** Cache of loaded modules */
  c: Record<string | number, WebpackModule>;
  /** Define property helper */
  d: (exports: object, name: string, getter: () => unknown) => void;
  /** Mark module as ES module */
  r: (exports: object) => void;
}

export {};