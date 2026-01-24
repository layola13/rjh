/**
 * Side-effect module that imports and initializes module 8985.
 * 
 * @module module_20147
 * @remarks
 * This module serves as an entry point or initialization module that ensures
 * module 8985 is loaded and executed. It has no exports and is used purely
 * for its side effects.
 * 
 * In webpack context, this pattern is commonly used for:
 * - Polyfills or runtime initialization
 * - CSS/style imports
 * - Global configuration setup
 * - Ensuring dependency execution order
 * 
 * @see module 8985 - The dependency module being loaded
 */

/**
 * Webpack module factory function signature.
 * 
 * @param exports - The exports object for this module (unused in side-effect modules)
 * @param module - The module object containing metadata
 * @param require - The webpack require function for loading dependencies
 */
declare function moduleFactory(
  exports: Record<string, unknown>,
  module: WebpackModule,
  require: WebpackRequire
): void;

/**
 * Webpack module metadata object.
 */
interface WebpackModule {
  /** Unique module identifier */
  id: number | string;
  /** Module exports object */
  exports: Record<string, unknown>;
  /** Whether the module has been loaded */
  loaded: boolean;
  /** Hot module replacement data (if enabled) */
  hot?: unknown;
}

/**
 * Webpack's internal require function type.
 * 
 * @param moduleId - The unique identifier of the module to load
 * @returns The exports object of the requested module
 */
interface WebpackRequire {
  (moduleId: number | string): unknown;
  /** Cache of loaded modules */
  c: Record<string | number, WebpackModule>;
  /** Module definitions registry */
  m: Record<string | number, typeof moduleFactory>;
}

// This module has no exports as it only performs side effects
export {};