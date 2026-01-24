/**
 * CSS module loader type definitions
 * Handles style injection and CSS module exports
 */

/**
 * CSS module class name mappings
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style loader options for injecting styles into the DOM
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
   * @param target - The DOM element to insert into (e.g., "head")
   */
  insert: InsertFunction;
  
  /**
   * DOM manipulation API
   */
  domAPI: DOMAPIFunction;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Function type for transforming style tags
 */
export type StyleTagTransformFunction = () => void;

/**
 * Function type for setting attributes on elements
 */
export type SetAttributesFunction = () => void;

/**
 * Function type for inserting elements into the DOM
 * @param target - The target selector or element
 */
export type InsertFunction = (target: string) => void;

/**
 * Function type for DOM API operations
 */
export type DOMAPIFunction = () => void;

/**
 * Function type for inserting style elements
 */
export type InsertStyleElementFunction = () => void;

/**
 * CSS module with metadata
 */
export interface CSSModule {
  /**
   * Local class name mappings for CSS modules
   */
  locals?: CSSModuleClasses;
}

/**
 * Default export: CSS module class name mappings
 * Returns undefined if no local classes are defined
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;