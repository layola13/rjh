/**
 * CSS Module type definitions
 * This module handles CSS style injection and management
 */

/**
 * CSS Modules class name mapping
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Style loader configuration options
 * Defines how styles should be injected and managed in the DOM
 */
export interface StyleLoaderOptions {
  /**
   * Transform function for style tag manipulation
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Insert function to add style elements to the DOM
   * @param target - The DOM element to insert into (e.g., "head")
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
 * Default export: CSS Module class name mappings
 * Returns an object mapping original class names to their scoped versions,
 * or undefined if no locals are defined
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * Re-exported style loader utilities
 * All named exports from the underlying style implementation module
 */
export * from './style-implementation';