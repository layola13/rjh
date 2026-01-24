/**
 * Module: module_9d99
 * Original module identifier from webpack bundle
 * 
 * @module module_9d99
 */

/**
 * Module exports type definition
 * This module appears to be empty or contains side-effects only
 */
export {};

/**
 * Type definitions for potential module context
 * These represent the typical webpack module parameters:
 * 
 * @param module - The module object containing exports
 * @param exports - Direct reference to module.exports
 * @param require - Webpack's require function for importing other modules
 */
declare module 'module_9d99' {
  /**
   * Module object structure
   */
  interface WebpackModule {
    /** Module exports */
    exports: any;
    /** Module identifier */
    id: string;
    /** Whether module has been loaded */
    loaded: boolean;
  }

  /**
   * Webpack require function type
   */
  interface WebpackRequire {
    /** Load a module by ID */
    (moduleId: string): any;
    /** Module cache */
    c: Record<string, WebpackModule>;
    /** Exposed modules */
    m: Record<string, Function>;
  }
}