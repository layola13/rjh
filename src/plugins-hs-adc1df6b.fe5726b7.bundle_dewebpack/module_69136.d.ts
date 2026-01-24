/**
 * CSS Module loader type definitions
 * Represents a webpack-compiled CSS module with style injection capabilities
 */

/**
 * CSS Module class names mapping
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Style injection configuration options
 */
export interface StyleLoaderOptions {
  /** Transform function for style tag manipulation */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** DOM insertion function bound to target element */
  insert: (target: string) => void;
  
  /** DOM API implementation for style manipulation */
  domAPI: () => void;
  
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module with locals (class name mappings)
 */
export interface CSSModuleWithLocals {
  /** Local class name mappings */
  locals?: CSSModuleClasses;
}

/**
 * Default export: CSS Module class names or undefined
 * Contains the scoped CSS class names for this module
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * Re-exported types and utilities from the underlying CSS module
 * All named exports from the source module except 'default'
 */
export * from 'css-module-source';