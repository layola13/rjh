/**
 * CSS Module type definitions
 * 
 * This module represents a CSS-in-JS module loader that processes stylesheets
 * and returns an object containing CSS class name mappings (locals).
 */

/**
 * Configuration object for style injection
 * Defines how styles should be inserted and managed in the DOM
 */
interface StyleLoaderConfig {
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
 * Transforms style tag content before insertion
 */
type StyleTagTransformFunction = () => void;

/**
 * Sets attributes on style elements
 */
type SetAttributesFunction = () => void;

/**
 * Inserts style elements into a specific DOM location
 * @param target - The target element selector (e.g., "head")
 */
type InsertFunction = (target: string) => void;

/**
 * DOM API utilities for style manipulation
 */
type DOMAPIFunction = () => void;

/**
 * Creates and inserts style elements into the DOM
 */
type InsertStyleElementFunction = () => void;

/**
 * CSS class name mappings exported from the stylesheet
 * Maps local class names to their hashed/scoped equivalents
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * CSS Module export structure
 * Contains both the style injection logic and the class name mappings
 */
interface CSSModuleExport {
  /** CSS class name mappings (if available) */
  locals?: CSSModuleLocals;
}

/**
 * Default export: CSS class name mappings
 * Returns the local class name mappings from the processed stylesheet,
 * or undefined if no locals are available
 */
declare const cssModuleLocals: CSSModuleLocals | undefined;

export default cssModuleLocals;

/**
 * Re-exported members from the CSS module
 * All named exports except 'default' are re-exported from the original module
 */
export * from './css-module-source';