/**
 * CSS Module type definitions
 * 
 * This module exports CSS class names and handles style injection.
 * Typically generated from a CSS/SCSS module file.
 */

/**
 * CSS class names mapping from the module
 * Key-value pairs where keys are the original class names
 * and values are the hashed/scoped class names
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
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
   * Bound to insert into the document head
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
 * Default export: CSS module class names object
 * Returns undefined if no locals are defined in the CSS module
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * Re-exported members from the underlying CSS module
 * All named exports except 'default' are re-exported
 */
export * from './styles.module';