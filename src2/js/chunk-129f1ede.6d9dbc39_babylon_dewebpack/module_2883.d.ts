/**
 * Module: module_2883
 * Original module ID: 2883
 * 
 * This module was originally wrapped by Webpack but contained no implementation.
 * The function signature suggests a CommonJS module pattern with:
 * @param exports - The module's exports object
 * @param module - The module metadata object
 * @param require - The require function for importing dependencies
 */

/**
 * Type definition for the module exports
 * Note: Original module had no implementation, so exports are unknown
 */
export type ModuleExports = unknown;

/**
 * Type definition for module metadata
 */
export interface Module {
  exports: ModuleExports;
  id: string | number;
  filename?: string;
  loaded?: boolean;
  parent?: Module | null;
  children?: Module[];
}

/**
 * Type definition for the require function
 */
export interface RequireFunction {
  (id: string | number): unknown;
  resolve?: (id: string) => string;
  cache?: Record<string, Module>;
}

/**
 * Original Webpack module function signature
 * @param exports - Module exports object
 * @param module - Module metadata
 * @param require - Require function for dependencies
 */
export type WebpackModuleFunction = (
  exports: ModuleExports,
  module: Module,
  require: RequireFunction
) => void;