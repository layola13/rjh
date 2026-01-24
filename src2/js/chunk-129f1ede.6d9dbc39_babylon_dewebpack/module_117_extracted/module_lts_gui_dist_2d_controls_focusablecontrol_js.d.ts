/**
 * Module export configuration.
 * 
 * This module marks exports as ES module by setting the __esModule flag.
 * Typically used in transpiled code to indicate ES6 module compatibility.
 * 
 * Original module: focusableControl
 * Path: lts/gui/dist/2D/controls/focusableControl.js
 */

/**
 * Webpack module factory function signature.
 * 
 * @param exports - The exports object to be populated by this module
 * @param module - The module metadata object
 * @param require - The module resolution function for importing dependencies
 */
export type WebpackModuleFactory = (
  exports: Record<string, unknown>,
  module: WebpackModule,
  require: WebpackRequire
) => void;

/**
 * Webpack module metadata.
 */
export interface WebpackModule {
  /** Unique module identifier */
  id: string | number;
  /** Module exports object */
  exports: Record<string, unknown>;
  /** Whether this module has been loaded */
  loaded?: boolean;
}

/**
 * Webpack require function for module resolution.
 */
export interface WebpackRequire {
  /** Load a module by ID */
  (moduleId: string | number): unknown;
  
  /** Mark exports as ES module */
  r(exports: Record<string, unknown>): void;
  
  /** Define property on exports */
  d(exports: Record<string, unknown>, definition: Record<string, () => unknown>): void;
  
  /** Ensure compatibility for non-ES modules */
  n(module: unknown): { readonly default: unknown };
  
  /** Get default export */
  o(object: Record<string, unknown>, property: string): boolean;
}