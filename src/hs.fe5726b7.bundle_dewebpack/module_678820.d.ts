/**
 * CSS Module type definitions
 * Represents a dynamically imported CSS module with style injection capabilities
 */

/**
 * CSS module class names mapping
 * Contains the locally scoped class names exported by the CSS module
 */
export interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style loader configuration options
 * Defines how styles should be injected and managed in the DOM
 */
export interface StyleLoaderOptions {
  /**
   * Transform function to apply to style tags before insertion
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * DOM insertion function bound to target container
   * @param target - The DOM element where styles will be inserted
   */
  insert: (target: string) => void;
  
  /**
   * DOM API implementation for style manipulation
   */
  domAPI: () => void;
  
  /**
   * Function to create and insert style elements into the DOM
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module exports
 * Default export containing the locally scoped class names from the stylesheet
 * Returns undefined if no local class names are defined
 */
declare const cssModuleLocals: CSSModuleLocals | undefined;

export default cssModuleLocals;

/**
 * Re-exports all named exports from the original CSS module
 * (excluding the 'default' export)
 */
export * from 'cssModule';