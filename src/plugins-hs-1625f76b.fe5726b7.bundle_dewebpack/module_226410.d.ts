/**
 * CSS Module Loader Declaration
 * 
 * This module represents a CSS loader that injects styles into the DOM
 * and exports CSS module class names.
 */

/**
 * CSS module class names mapping
 * Maps CSS class names to their scoped/hashed equivalents
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style injection options for DOM manipulation
 */
export interface StyleLoaderOptions {
  /** Transform function to create and inject style tags */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** DOM insertion function bound to target element */
  insert: (target: string) => void;
  
  /** DOM API utilities for style manipulation */
  domAPI: () => void;
  
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS module exports
 * Contains the scoped class names defined in the CSS file
 * Returns undefined if no locals are defined
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

export default cssModuleLocals;

/**
 * Re-exports all named exports from the underlying CSS module
 * (excluding 'default')
 */
export * from './styles.module.css';