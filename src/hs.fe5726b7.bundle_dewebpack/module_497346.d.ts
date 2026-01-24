/**
 * CSS Module type definitions
 * 
 * This module represents a CSS Modules import with style injection capabilities.
 * It handles style tag transformation, DOM manipulation, and exports CSS class names.
 */

/**
 * CSS Modules class names mapping
 * Maps CSS class names to their hashed/scoped equivalents
 */
export type CSSModuleClasses = Record<string, string>;

/**
 * Style injection configuration
 */
interface StyleInjectionOptions {
  /** Transform function for style tags before insertion */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** DOM insertion function bound to target element (typically "head") */
  insert: (target: string) => void;
  
  /** DOM API utilities for style manipulation */
  domAPI: () => void;
  
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module exports
 * Contains the local class name mappings from the CSS file
 */
export interface CSSModuleExports {
  /** Local CSS class names scoped to this module */
  locals?: CSSModuleClasses;
}

/**
 * Default export containing the CSS module's local class names
 * Returns undefined if no locals are defined
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

export default cssModuleLocals;

/**
 * Re-exports all named exports from the CSS module
 * (excluding the default export)
 */
export * from './css-module-source';