/**
 * CSS Module Loader Type Definitions
 * 
 * This module handles CSS module loading and style injection into the DOM.
 * It provides type-safe access to CSS class names and manages style tag lifecycle.
 */

/**
 * Configuration options for style loader insertion and management
 */
interface StyleLoaderOptions {
  /** Transform function to modify style tags before insertion */
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
 * Function type for transforming style tag content
 */
type StyleTagTransformFunction = () => void;

/**
 * Function type for setting attributes on style elements
 */
type SetAttributesFunction = () => void;

/**
 * Function type for inserting elements into specific DOM locations
 * @param target - The target selector or element (e.g., "head")
 */
type InsertFunction = (target: string) => void;

/**
 * Function type for DOM manipulation utilities
 */
type DOMAPIFunction = () => void;

/**
 * Function type for creating and inserting style elements
 */
type InsertStyleElementFunction = () => void;

/**
 * CSS Module exports containing class name mappings
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * CSS Module with optional locals (class name mappings)
 */
interface CSSModule {
  /** CSS class name mappings, undefined if no classes exported */
  locals?: CSSModuleLocals;
}

/**
 * Re-exported types and utilities from the CSS module loader
 */
export * from './css-module-loader';

/**
 * Default export: CSS class name mappings
 * Returns an object mapping CSS class names to their hashed equivalents,
 * or undefined if the module has no exported classes.
 */
declare const cssModuleExport: CSSModuleLocals | undefined;

export default cssModuleExport;