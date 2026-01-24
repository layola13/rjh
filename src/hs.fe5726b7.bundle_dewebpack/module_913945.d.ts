/**
 * CSS Module Loader
 * 
 * This module handles CSS style injection and management in a webpack environment.
 * It provides functionality for loading CSS modules with local scoped class names.
 */

/**
 * Configuration options for style loading
 */
export interface StyleLoaderOptions {
  /**
   * Function to transform and inject style tags into the DOM
   */
  styleTagTransform: StyleTagTransformFunction;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: SetAttributesFunction;
  
  /**
   * Function to insert style elements into the DOM
   * @param target - The DOM insertion target (e.g., "head")
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
 * Function type for transforming and applying styles
 */
export type StyleTagTransformFunction = () => void;

/**
 * Function type for setting attributes on DOM elements
 */
export type SetAttributesFunction = () => void;

/**
 * Function type for inserting elements into the DOM
 * @param target - The target location for insertion
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
 * CSS Module with local scoped class names
 */
export interface CSSModule {
  /**
   * Mapping of local class names to generated global class names
   */
  locals?: Record<string, string>;
}

/**
 * Default export: CSS module locals (class name mappings)
 * Returns undefined if no local class names are defined
 */
declare const cssModuleLocals: Record<string, string> | undefined;

export default cssModuleLocals;