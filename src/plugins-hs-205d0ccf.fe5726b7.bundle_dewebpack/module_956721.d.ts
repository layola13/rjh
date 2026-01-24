/**
 * CSS Module type definitions
 * Represents a CSS module with optional exported class names
 */

/**
 * CSS module class names mapping
 * Maps CSS class names to their scoped equivalents
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
   * Function to insert style elements into a specified location
   * @param target - DOM location to insert styles (e.g., "head")
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
 * CSS Module exports
 * Contains all exported identifiers from the CSS module
 */
export type CSSModuleExports = Record<string, unknown>;

/**
 * Default export: CSS module class names
 * Returns the locally scoped class names if available, otherwise undefined
 */
declare const cssModule: CSSModuleClasses | undefined;

export default cssModule;

/**
 * Re-exported CSS module members
 * All named exports from the original CSS module are re-exported here
 */
export * from './css-module-source';