/**
 * CSS Module type definitions
 * 
 * This module represents a CSS-in-JS module that exports class names
 * and other style-related properties through webpack's style-loader.
 */

/**
 * CSS Module exports interface
 * Represents the locally scoped class names exported by a CSS module
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style loader options configuration
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
   * Function to insert style elements into a specified DOM location
   * @param target - The DOM target (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM API utilities for style manipulation
   */
  domAPI: () => void;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * Default export: CSS module locals (class name mappings)
 * Returns the locally scoped class names from the CSS module,
 * or undefined if no locals are available
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

export default cssModuleLocals;

/**
 * Re-export all named exports from the original CSS module
 * (excluding the default export)
 */
export * from './original-css-module';