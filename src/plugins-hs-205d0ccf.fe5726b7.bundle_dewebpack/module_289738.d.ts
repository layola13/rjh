/**
 * CSS Module loader type definitions
 * 
 * This module represents a Webpack CSS module with style injection capabilities.
 * It exports CSS class names as a typed object for use in TypeScript applications.
 */

/**
 * CSS Module class names mapping
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style loader options for injecting CSS into the DOM
 */
export interface StyleLoaderOptions {
  /** Transform function to create and inject style tags */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** Function to insert style elements into the DOM */
  insert: (target: string) => void;
  
  /** DOM API utilities for style manipulation */
  domAPI: () => void;
  
  /** Function to create style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module exports
 * Contains all named exports from the original CSS module
 */
export type CSSModuleExports = Record<string, unknown>;

/**
 * Default export: CSS Module class names
 * 
 * @remarks
 * This is the primary export used to access CSS class names in TypeScript.
 * Returns undefined if no local class names are defined.
 * 
 * @example
 *