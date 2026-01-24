/**
 * CSS Module type definitions
 * Represents a dynamically imported CSS module with locally scoped class names
 */

/**
 * CSS Module locals interface
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleLocals {
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
 * Default export: CSS module locals (class name mappings)
 * Returns undefined if no local class names are defined
 */
declare const cssModuleLocals: CSSModuleLocals | undefined;

export default cssModuleLocals;

/**
 * Re-exported members from the original CSS module
 * All named exports (excluding 'default') are forwarded
 */
export * from './original-css-module';