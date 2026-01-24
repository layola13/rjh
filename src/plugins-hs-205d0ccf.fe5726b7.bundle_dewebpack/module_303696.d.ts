/**
 * CSS Module Type Definitions
 * This module handles runtime style injection and exports CSS class name mappings
 */

/**
 * CSS Module class name mappings
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Style loader configuration options
 */
export interface StyleLoaderOptions {
  /** Function to transform and inject style tags into DOM */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** Function to insert style elements into DOM */
  insert: (target: string) => void;
  
  /** DOM API utilities for style manipulation */
  domAPI: () => void;
  
  /** Function to create style DOM elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module exports
 * Contains the local class name mappings if CSS Modules are enabled
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

export default cssModuleLocals;

/**
 * Re-exported utilities from the underlying CSS loader
 */
export * from './css-loader-runtime';