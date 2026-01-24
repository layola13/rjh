/**
 * CSS Module Export Type Definition
 * 
 * This module exports CSS styles for a property bar checkblock component.
 * The styles define layout, spacing, colors, and states (hover, focus, selected, disabled)
 * for a flexible checkbox-like block UI component.
 * 
 * @module PropertyBarCheckblockStyles
 * @originalId 418289
 */

/**
 * Webpack CSS loader module parameter
 * @param exports - The module exports object to be populated
 * @param require - The require function for loading dependencies
 * @param module - The current module metadata
 */
declare function cssModule(
  exports: CSSModuleExports,
  require: RequireFunction,
  module: ModuleMetadata
): void;

/**
 * CSS module exports interface
 */
interface CSSModuleExports {
  /** Module identifier */
  id: string | number;
  
  /** CSS content as string array */
  exports: unknown;
  
  /**
   * Push method to add CSS rules to the exports
   * @param rule - Array containing module ID and CSS string
   */
  push(rule: [string | number, string]): void;
}

/**
 * Require function type for module loading
 */
interface RequireFunction {
  /**
   * Load a module by ID
   * @param moduleId - The numeric or string identifier of the module
   * @returns The loaded module's exports
   */
  (moduleId: number | string): unknown;
}

/**
 * Module metadata interface
 */
interface ModuleMetadata {
  /** Unique module identifier */
  id: string | number;
  
  /** Module exports object */
  exports: CSSModuleExports;
  
  /** Whether the module has been loaded */
  loaded?: boolean;
}

/**
 * CSS Loader Factory Function
 * Creates a CSS loader that processes source maps
 * 
 * @param useSourceMap - Whether to include source map support
 * @returns A CSS loader instance with push method
 */
declare function cssLoaderFactory(useSourceMap: boolean): CSSLoader;

/**
 * CSS Loader interface
 */
interface CSSLoader {
  /**
   * Add CSS content to the loader
   * @param content - Array containing module ID and CSS string
   */
  push(content: [string | number, string]): void;
}

export = cssModule;