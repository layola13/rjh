/**
 * Interop helper for importing CommonJS modules into ES modules.
 * Handles namespace imports and preserves module structure.
 * 
 * @module InteropRequireWildcard
 */

/**
 * Cache for non-babel transpiled modules
 */
type ModuleCache = WeakMap<any, ModuleNamespace>;

/**
 * Represents a module namespace object with optional default export
 */
interface ModuleNamespace {
  __proto__: null;
  default: any;
  [key: string]: any;
}

/**
 * Options for controlling module import behavior
 */
interface ImportOptions {
  /** Whether this is a Babel-transpiled module requiring special handling */
  isBabelTranspiled?: boolean;
}

/**
 * Converts a CommonJS module into an ES module namespace object.
 * Preserves all exports and handles both default and named exports correctly.
 * 
 * @param module - The module to convert (CommonJS or ES module)
 * @param options - Import configuration options
 * @returns A namespace object containing all module exports
 * 
 * @example
 *