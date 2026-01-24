/**
 * CSS Module Declaration
 * 
 * This module exports CSS class names as a typed object for use in TypeScript/React applications.
 * When imported, it provides type-safe access to CSS class names defined in the associated stylesheet.
 */

/**
 * CSS module class names mapping
 * Each property represents a CSS class name that can be applied to DOM elements
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style injection configuration options
 */
export interface StyleLoaderOptions {
  /** Transform function to process style tags before insertion */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** DOM insertion strategy function */
  insert: (target: string) => void;
  
  /** DOM manipulation API wrapper */
  domAPI: () => void;
  
  /** Function to create and insert style elements into the DOM */
  insertStyleElement: () => void;
}

/**
 * Default export containing CSS class name mappings
 * Returns undefined if no local class names are defined
 * 
 * @example
 *