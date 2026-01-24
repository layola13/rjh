/**
 * CSS Module type definitions
 * Generated from webpack module 738185
 * 
 * This module exports CSS class name mappings and style injection utilities
 * for a CSS/SCSS module processed through webpack's style-loader chain.
 */

/**
 * Style loader options configuration
 * Controls how styles are injected into the DOM
 */
interface StyleLoaderOptions {
  /**
   * Function to transform and inject style tags into the document
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Function to insert style elements into a specified DOM location
   * @param target - The DOM element to insert into (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM API utility functions for style manipulation
   */
  domAPI: () => void;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module class name mapping
 * Maps local class names to their hashed equivalents
 */
interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Default export: CSS Module locals (class name mappings)
 * Returns undefined if no local class names are defined
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

export default cssModuleLocals;

/**
 * Re-exported utilities from the underlying CSS loader
 * All named exports except 'default' from the original module
 */
export * from './css-loader-module';