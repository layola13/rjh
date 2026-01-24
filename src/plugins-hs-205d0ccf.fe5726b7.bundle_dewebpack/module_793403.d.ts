/**
 * CSS Module loader type definitions
 * Handles style injection and CSS module exports
 */

/**
 * CSS Module class names mapping
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Style loader options for runtime injection
 */
export interface StyleLoaderOptions {
  /**
   * Transform function to apply to style tags before insertion
   */
  styleTagTransform: StyleTagTransformFunction;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: SetAttributesFunction;
  
  /**
   * Function to insert style elements into the DOM
   * @param target - Target element selector (e.g., "head")
   */
  insert: InsertFunction;
  
  /**
   * DOM API implementation for style manipulation
   */
  domAPI: DOMAPIFunction;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Transform function type for style tag processing
 */
export type StyleTagTransformFunction = (css: string, styleElement: HTMLStyleElement) => void;

/**
 * Function type for setting attributes on style elements
 */
export type SetAttributesFunction = (element: HTMLElement, attributes?: Record<string, string>) => void;

/**
 * Function type for inserting elements into the DOM
 */
export type InsertFunction = (element: HTMLElement) => void;

/**
 * DOM API function type for style manipulation
 */
export type DOMAPIFunction = (options: unknown) => void;

/**
 * Function type for creating and inserting style elements
 */
export type InsertStyleElementFunction = (options: unknown) => HTMLStyleElement;

/**
 * CSS Module exports
 * Contains the locally scoped class names from the CSS module
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;