/**
 * Webpack module declaration
 * 
 * @module module_eab0
 * @remarks
 * This module appears to be empty or its implementation was removed.
 * Standard webpack module factory function signature.
 */

/**
 * Webpack module factory function
 * 
 * @param module - The module object that will be populated with exports
 * @param exports - The exports object (alias to module.exports)
 * @param require - The webpack require function for loading dependencies
 */
declare function moduleFactory(
  module: WebpackModule,
  exports: Record<string, any>,
  require: WebpackRequire
): void;

/**
 * Webpack module object
 */
interface WebpackModule {
  /** Module identifier */
  id: string | number;
  /** Module exports */
  exports: Record<string, any>;
  /** Whether the module has been loaded */
  loaded: boolean;
  /** Hot module replacement data */
  hot?: WebpackHotModule;
}

/**
 * Webpack require function for module resolution
 */
interface WebpackRequire {
  /** Load a module by its identifier */
  (moduleId: string | number): any;
  /** Cache of loaded modules */
  c: Record<string | number, WebpackModule>;
  /** Define property helper */
  d: (exports: any, name: string, getter: () => any) => void;
  /** ES module marker */
  r: (exports: any) => void;
  /** Compatibility getter */
  n: (module: any) => any;
}

/**
 * Hot module replacement interface
 */
interface WebpackHotModule {
  accept(dependencies?: string | string[], callback?: () => void): void;
  decline(dependencies?: string | string[]): void;
  dispose(callback: (data: any) => void): void;
  addDisposeHandler(callback: (data: any) => void): void;
}

export {};