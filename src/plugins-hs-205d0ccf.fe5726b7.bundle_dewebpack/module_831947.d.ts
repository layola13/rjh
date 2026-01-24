/**
 * CSS Modules Style Configuration
 * 
 * This module exports style-loader configuration and CSS module locals.
 * Originally compiled from webpack module 831947.
 */

/**
 * Style loader transformation function
 * Handles the transformation of style tags in the DOM
 */
export type StyleTagTransformFunction = () => void;

/**
 * Function to set attributes on style elements
 */
export type SetAttributesFunction = () => void;

/**
 * DOM insertion function
 * Handles inserting style elements into the specified DOM location
 * 
 * @param location - The DOM location where styles should be inserted (e.g., "head")
 */
export type InsertFunction = (location: string) => void;

/**
 * DOM API interface for style manipulation
 */
export type DomAPIFunction = () => void;

/**
 * Function to create and insert style elements
 */
export type InsertStyleElementFunction = () => void;

/**
 * Style loader options configuration
 * Configures how CSS modules are loaded and applied to the DOM
 */
export interface StyleLoaderOptions {
  /** Transform function for style tags */
  styleTagTransform: StyleTagTransformFunction;
  
  /** Function to set attributes on style elements */
  setAttributes: SetAttributesFunction;
  
  /** Function to insert styles into DOM, bound to "head" location */
  insert: InsertFunction;
  
  /** DOM manipulation API */
  domAPI: DomAPIFunction;
  
  /** Function to create style elements */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * CSS Module locals type
 * Contains the mapping of CSS class names to their hashed/scoped equivalents
 */
export type CSSModuleLocals = Record<string, string> | undefined;

/**
 * Default export containing CSS module class name mappings
 * 
 * Returns the locals object from the CSS module if available,
 * otherwise returns undefined.
 */
declare const cssModuleExport: CSSModuleLocals;

export default cssModuleExport;