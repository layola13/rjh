/**
 * CSS Module loader type definitions
 * Describes the structure of a webpack CSS module with style injection capabilities
 */

/**
 * CSS Module class names mapping
 * Maps CSS class names to their hashed/scoped equivalents
 */
export type CSSModuleClasses = Record<string, string>;

/**
 * Style injection options for CSS modules
 */
export interface StyleLoaderOptions {
  /**
   * Transform function to modify style tags before insertion
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Function to insert style elements into the DOM
   * @param target - Target selector where styles should be inserted (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM manipulation API for style injection
   */
  domAPI: () => void;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module exports
 * Contains the locally scoped class names from the CSS module
 */
export interface CSSModuleExports {
  /**
   * Locally scoped CSS class names
   */
  locals?: CSSModuleClasses;
}

/**
 * Default export: CSS Module class names
 * Returns the locally scoped class names or undefined if not available
 */
declare const cssModuleClasses: CSSModuleClasses | undefined;

export default cssModuleClasses;

/**
 * Re-exported members from the CSS module
 * All named exports from the original CSS module are available here
 */
export * from '693433';