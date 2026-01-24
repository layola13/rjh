/**
 * CSS Module loader type definitions
 * Handles dynamic style injection and CSS module class name exports
 */

/**
 * CSS Modules class name mapping
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
   * Function to transform and inject style tags into the DOM
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Function to insert style elements into a specific DOM location
   * @param target - The target element selector (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM manipulation API for style operations
   */
  domAPI: () => void;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module metadata
 */
export interface CSSModule {
  /**
   * The exported CSS class name mappings
   */
  locals?: CSSModuleClasses;
  
  /**
   * Additional module properties
   */
  [key: string]: unknown;
}

/**
 * Default export: CSS Module class names
 * Returns the locally scoped class names if available, undefined otherwise
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;

/**
 * Re-export all named exports from the CSS module
 * Excludes the 'default' export to prevent conflicts
 */
export * from './css-module-types';