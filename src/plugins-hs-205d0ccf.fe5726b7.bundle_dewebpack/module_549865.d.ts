/**
 * CSS Module loader type definitions
 * Handles style injection and CSS module class name exports
 */

/**
 * CSS Module class names mapping
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  readonly [key: string]: string;
}

/**
 * Style loader configuration options
 */
export interface StyleLoaderOptions {
  /**
   * Transform function to apply styles to DOM
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Function to insert style elements into DOM
   * @param target - Target selector (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM manipulation API
   */
  domAPI: () => void;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module exports interface
 * Contains both the locals (class names) and potential additional exports
 */
export interface CSSModuleExports {
  /**
   * Local class name mappings from the CSS module
   */
  locals?: CSSModuleClasses;
  
  /**
   * Additional CSS module exports
   */
  [key: string]: unknown;
}

/**
 * Default export: CSS module class names
 * Returns the scoped class names if available, otherwise undefined
 */
declare const cssModuleClasses: CSSModuleClasses | undefined;

export default cssModuleClasses;