/**
 * CSS Module Loader Configuration
 * 
 * This module handles the configuration and initialization of CSS-in-JS style injection.
 * It sets up the style loader with various plugins for transforming and inserting styles.
 */

/**
 * Configuration options for style loading and injection
 */
export interface StyleLoaderOptions {
  /** Transform function to apply to style tags before insertion */
  styleTagTransform: StyleTagTransformFunction;
  
  /** Function to set attributes on style elements */
  setAttributes: SetAttributesFunction;
  
  /** Function to insert style elements into the DOM */
  insert: InsertFunction;
  
  /** DOM API utilities for style manipulation */
  domAPI: DOMAPIFunction;
  
  /** Function to create and insert style elements */
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
 * Function type for inserting elements into specific DOM locations
 * @param target - The target selector or element (e.g., "head")
 */
export type InsertFunction = (target: string) => void;

/**
 * Function type for DOM API operations
 */
export type DOMAPIFunction = () => void;

/**
 * Function type for creating and inserting style elements
 */
export type InsertStyleElementFunction = () => void;

/**
 * CSS Module locals type - contains the class name mappings
 */
export interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * CSS Module export structure
 */
export interface CSSModuleExport {
  /** CSS class name mappings for CSS modules */
  locals?: CSSModuleLocals;
  [key: string]: unknown;
}

/**
 * The default export - CSS module class name mappings or undefined
 * 
 * When CSS modules are enabled, this contains an object mapping
 * the original class names to their hashed equivalents.
 * Returns undefined if no locals are available.
 */
declare const cssModuleExport: CSSModuleLocals | undefined;

export default cssModuleExport;

/**
 * Re-exported utilities from the style loader module (module 377962)
 * All exports except 'default' are re-exported from the source module
 */
export * from './style-loader-utilities';