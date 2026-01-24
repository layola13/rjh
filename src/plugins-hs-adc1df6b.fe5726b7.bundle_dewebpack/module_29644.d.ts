/**
 * CSS Module type definitions
 * Original Module ID: 29644
 * 
 * This module handles CSS-in-JS style injection and exports CSS module class names.
 */

/**
 * CSS Module class names mapping
 * Maps semantic class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style loader configuration options
 */
export interface StyleLoaderOptions {
  /**
   * Function to transform and inject style tags into the DOM
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Function to insert style elements into a target container
   * @param target - DOM selector or element where styles should be injected
   */
  insert: (target: string) => void;
  
  /**
   * DOM manipulation API for style injection
   */
  domAPI: () => void;
  
  /**
   * Function to create and configure style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS module with optional locals (class name mappings)
 */
export interface CSSModule {
  /**
   * Local class name mappings (scoped CSS classes)
   */
  locals?: CSSModuleClasses;
  
  [key: string]: unknown;
}

/**
 * Default export: CSS module class names
 * Returns the locally scoped class names from the CSS module,
 * or undefined if no local mappings exist.
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;

/**
 * Re-exported members from the underlying CSS module
 * All named exports from the original module (excluding 'default')
 */
export * from './css-module-source';