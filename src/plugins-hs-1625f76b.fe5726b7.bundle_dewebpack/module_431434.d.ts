/**
 * CSS Module exports and style injection configuration
 * Handles dynamic style loading and provides typed CSS module exports
 */

/**
 * CSS Modules class name mapping
 * Maps local class names to their hashed global counterparts
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Style injection options for runtime CSS loading
 */
export interface StyleInjectionOptions {
  /**
   * Transforms style tags before insertion into DOM
   */
  styleTagTransform: StyleTagTransformFunction;
  
  /**
   * Sets custom attributes on style elements
   */
  setAttributes: SetAttributesFunction;
  
  /**
   * Inserts style elements into specified DOM location
   */
  insert: InsertFunction;
  
  /**
   * DOM manipulation API for style injection
   */
  domAPI: DOMAPIFunction;
  
  /**
   * Creates and inserts style elements
   */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Function type for transforming style tags
 */
export type StyleTagTransformFunction = () => void;

/**
 * Function type for setting attributes on style elements
 */
export type SetAttributesFunction = () => void;

/**
 * Function type for inserting styles into DOM
 */
export type InsertFunction = (target: string) => void;

/**
 * Function type for DOM API operations
 */
export type DOMAPIFunction = () => void;

/**
 * Function type for creating style elements
 */
export type InsertStyleElementFunction = () => void;

/**
 * Default export: CSS Module class name mappings
 * Returns undefined if no local class names are defined
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;