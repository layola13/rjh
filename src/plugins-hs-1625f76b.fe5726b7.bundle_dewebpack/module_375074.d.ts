/**
 * CSS Modules Type Definitions
 * 
 * This module represents a CSS-in-JS module loader configuration.
 * It configures style injection methods and exports CSS module class names.
 */

/**
 * Style loader configuration interface
 */
export interface StyleLoaderConfiguration {
  /** Transform function for style tags */
  styleTagTransform: StyleTagTransformFunction;
  
  /** Function to set attributes on style elements */
  setAttributes: SetAttributesFunction;
  
  /** Function to insert style elements into DOM */
  insert: InsertFunction;
  
  /** DOM manipulation API */
  domAPI: DOMAPIFunction;
  
  /** Function to insert style elements */
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
 * Function type for inserting elements into specific targets
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
 * CSS Module locals type - maps CSS class names to generated hash names
 */
export interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * CSS Module export structure
 */
export interface CSSModuleExport {
  /** Optional locals object containing CSS class name mappings */
  locals?: CSSModuleLocals;
}

/**
 * Default export - CSS module class name mappings
 * Returns undefined if no locals are defined
 */
declare const cssModuleExport: CSSModuleLocals | undefined;

export default cssModuleExport;