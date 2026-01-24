/**
 * CSS Module Exports Type Definition
 * Module: module_212168
 * Original ID: 212168
 * 
 * This module exports CSS styles for an underlay image popup component.
 */

/**
 * Represents the CSS module loader function signature.
 * 
 * @param exports - The module exports object
 * @param module - The current module metadata
 * @param require - The module require function
 */
declare module "module_212168" {
  /**
   * CSS class names exported by this module
   */
  export interface CSSModuleClasses {
    /** Title container for the underlay image popup (100% width, 20px height, positioned absolute) */
    "underlayimg-pop-title": string;
    
    /** Main image container with centered positioning and transform-based alignment */
    "underlayimg-pop-img": string;
    
    /** Icon container positioned at top-right corner of the popup */
    "underlayimg-pop-icon": string;
  }

  const classes: CSSModuleClasses;
  export default classes;
}

/**
 * CSS Loader Module Factory Type
 * 
 * @param useSourceMap - Whether to include source maps in the output
 * @returns A CSS loader instance with push method
 */
export interface CSSLoaderFactory {
  (useSourceMap: boolean): CSSLoader;
}

/**
 * CSS Loader Instance
 */
export interface CSSLoader {
  /**
   * Pushes CSS content into the loader
   * 
   * @param entry - Tuple containing module ID and CSS content string
   */
  push(entry: [string, string]): void;
}

/**
 * Module Exports Object
 */
export interface ModuleExports {
  /** The module's unique identifier */
  id: string;
  
  /** The exported CSS module classes or loader */
  exports: CSSModuleClasses | CSSLoader;
}

/**
 * Webpack Module Definition Function
 * 
 * @param module - The module exports object
 * @param exports - The exports object (same as module.exports)
 * @param require - The require function for loading dependencies
 */
export type WebpackModuleFunction = (
  module: ModuleExports,
  exports: unknown,
  require: (moduleId: number) => CSSLoaderFactory
) => void;