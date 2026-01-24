/**
 * CSS Module type definitions
 * Original Module ID: 633527
 * 
 * This module handles CSS-in-JS functionality with style injection and local class name mapping.
 */

/**
 * CSS Module class names mapping
 * Maps original class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Style loader configuration options
 */
interface StyleLoaderOptions {
  /** Transform function for style tag manipulation */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** Insert function for DOM manipulation, bound to target container */
  insert: (target: string) => void;
  
  /** DOM API utilities for style injection */
  domAPI: () => void;
  
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module with locals (scoped class names)
 */
interface CSSModule {
  /** Local scoped class names */
  locals?: CSSModuleClasses;
  
  /** Additional module metadata */
  [key: string]: unknown;
}

/**
 * Re-exported utilities from the style loader module (522752)
 * All exports except 'default' are re-exported from the source module
 */
export * from './style-loader-module';

/**
 * Default export: CSS Module class names
 * Returns the locally scoped class names if available, undefined otherwise
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

export default cssModuleLocals;