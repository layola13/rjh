/**
 * CSS Module type definitions
 * 
 * This module represents a CSS module loader configuration that processes
 * stylesheets and injects them into the DOM at runtime.
 */

/**
 * CSS Modules class name mapping
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style injection configuration options
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
   * DOM insertion strategy - bound to insert into specified target
   */
  insert: (target: string) => void;
  
  /**
   * DOM manipulation API interface
   */
  domAPI: () => void;
  
  /**
   * Factory function to create style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module exports
 * Contains the locally scoped class names from the processed stylesheet
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

export default cssModuleLocals;

/**
 * Re-export all named exports from the original CSS module
 * (excluding 'default')
 */
export * from './original-css-module';