/**
 * CSS Module loader type definitions
 * This module handles CSS-in-JS style injection and exports CSS module class names
 */

/**
 * CSS Module class names mapping
 * Maps CSS class names to their scoped/hashed equivalents
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
   * Function to insert style elements into a specific DOM location
   * @param target - The DOM element selector (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM API interface for style manipulation
   */
  domAPI: () => void;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module exports
 * Contains the scoped class names from the imported CSS file
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

export default cssModuleLocals;

/**
 * Re-export all named exports from the CSS module
 * Allows importing specific class names: import { className } from './styles.css'
 */
export * from './styles.css';