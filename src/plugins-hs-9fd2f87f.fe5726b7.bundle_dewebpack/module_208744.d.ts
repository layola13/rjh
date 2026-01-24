/**
 * CSS Module loader type definitions
 * This module handles CSS-in-JS loading and provides typed access to CSS class names
 */

/**
 * CSS class name mapping exported by the CSS module
 * Maps semantic class names to their generated/hashed counterparts
 */
export type CSSModuleClasses = Record<string, string> | undefined;

/**
 * Configuration for CSS injection into the DOM
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
   * Function to insert style elements into a specific DOM location
   * @param target - The DOM selector where styles should be inserted (e.g., "head")
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
 * Re-export all named exports from the CSS module (excluding 'default')
 */
export * from './style-module';

/**
 * Default export: CSS module class name mappings
 * Returns an object mapping class names to their processed values,
 * or undefined if no locals are present
 */
declare const cssModuleLocals: CSSModuleClasses;
export default cssModuleLocals;