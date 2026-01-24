/**
 * CSS Module Type Definitions
 * Module: module_231886
 * Original ID: 231886
 * 
 * This module handles CSS-in-JS styling with support for CSS Modules.
 * It processes stylesheets and provides typed access to CSS class names.
 */

/**
 * Configuration options for style injection and transformation
 */
export interface StyleLoaderOptions {
  /** Transform function applied to style tags before injection */
  styleTagTransform: StyleTagTransformFunction;
  
  /** Function to set attributes on style elements */
  setAttributes: SetAttributesFunction;
  
  /** Function to insert style elements into the DOM */
  insert: InsertFunction;
  
  /** DOM manipulation API provider */
  domAPI: DOMAPIProvider;
  
  /** Function to create and insert style elements */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Function type for transforming style tags
 */
export type StyleTagTransformFunction = () => void;

/**
 * Function type for setting attributes on DOM elements
 */
export type SetAttributesFunction = () => void;

/**
 * Function type for inserting elements into the DOM
 * @param target - The DOM location where styles should be inserted (e.g., "head")
 */
export type InsertFunction = (target: string) => void;

/**
 * Provider for DOM manipulation APIs
 */
export type DOMAPIProvider = () => void;

/**
 * Function type for inserting style elements
 */
export type InsertStyleElementFunction = () => void;

/**
 * CSS Module exports containing class name mappings
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Default export: CSS Module class name mappings
 * Returns the local class names defined in the CSS module, or undefined if none exist
 */
declare const cssModuleExports: CSSModuleLocals | undefined;

export default cssModuleExports;