/**
 * Webpack Module Loader Function
 * 
 * This module appears to be an empty webpack module wrapper.
 * Without the original implementation, this serves as a placeholder declaration.
 * 
 * @module module_d748
 * @original-id d748
 */

/**
 * Webpack module loader function signature
 * 
 * @param module - The module exports object
 * @param exports - The exports object (typically same as module.exports)
 * @param require - The webpack require function for loading dependencies
 */
declare function webpackModule(
  module: WebpackModule,
  exports: WebpackExports,
  require: WebpackRequire
): void;

/**
 * Webpack module object containing exports and metadata
 */
interface WebpackModule {
  /** The exports object */
  exports: WebpackExports;
  /** Module identifier */
  id: string | number;
  /** Whether the module has been loaded */
  loaded: boolean;
  /** Optional module children */
  children?: WebpackModule[];
  /** Optional parent module */
  parent?: WebpackModule;
}

/**
 * Module exports object - can contain any exported values
 */
interface WebpackExports {
  [key: string]: unknown;
}

/**
 * Webpack require function for dynamic module loading
 */
interface WebpackRequire {
  /** Load a module by ID */
  (moduleId: string | number): unknown;
  /** Cache of loaded modules */
  c: Record<string | number, WebpackModule>;
  /** Exposed modules */
  m: Record<string | number, Function>;
  /** Define getter for harmony exports */
  d: (exports: object, name: string, getter: () => unknown) => void;
  /** Mark module as ES module */
  r: (exports: object) => void;
  /** Get default export compatibility helper */
  n: (module: unknown) => unknown;
  /** Object.prototype.hasOwnProperty shorthand */
  o: (object: object, property: string) => boolean;
  /** Public path for assets */
  p: string;
}

export {};