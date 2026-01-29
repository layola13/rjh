/**
 * CSS Module loader type definitions
 * Handles dynamic CSS module imports with style injection
 */

/**
 * CSS Module class name mappings
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  readonly [key: string]: string;
}

/**
 * Style loader options for runtime style injection
 */
export interface StyleLoaderOptions {
  /**
   * Transform function applied to style tags before insertion
   */
  styleTagTransform: () => void;
  
  /**
   * Sets attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Insertion point for style elements in the DOM
   * @param target - DOM selector (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM API methods for style manipulation
   */
  domAPI: () => void;
  
  /**
   * Creates and inserts style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module export structure
 */
export interface CSSModuleExport {
  /**
   * Local class name mappings for the CSS module
   */
  locals?: CSSModuleClasses;
}

/**
 * Default export: CSS module class names
 * @returns Scoped CSS class name mappings, or undefined if no locals exist
 */
declare const cssModuleClasses: CSSModuleClasses | undefined;

export default cssModuleClasses;