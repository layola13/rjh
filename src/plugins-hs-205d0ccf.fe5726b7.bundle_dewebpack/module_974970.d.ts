/**
 * CSS Module Loader
 * 
 * This module handles CSS/style injection and management in the application.
 * It uses style-loader utilities to inject styles into the DOM.
 */

/**
 * Style loader configuration options
 */
export interface StyleLoaderOptions {
  /** Transform function to apply to style tags before insertion */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** DOM insertion function bound to a specific target */
  insert: (target: string) => void;
  
  /** DOM API utilities for style manipulation */
  domAPI: () => void;
  
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module locals (class name mappings)
 * Contains the hashed/scoped class names exported by the CSS module
 */
export interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Default export: CSS module locals object or undefined
 * 
 * When CSS modules are enabled, this contains the mapping of local class names
 * to their hashed/scoped equivalents. Returns undefined if no locals are present.
 */
declare const cssModuleExport: CSSModuleLocals | undefined;

export default cssModuleExport;

/**
 * Re-exported utilities from the style loader package
 * These are helper functions for style injection and manipulation
 */
export * from 'style-loader';