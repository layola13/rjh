/**
 * CSS Module type definitions
 * This module represents a CSS-in-JS module with dynamic style injection capabilities.
 * 
 * The module exports CSS class names as properties and handles style injection into the DOM.
 */

/**
 * Style injection configuration interface
 * Defines how CSS styles are processed and injected into the document
 */
interface StyleInjectionOptions {
  /** Transform function applied to style tags before insertion */
  styleTagTransform: StyleTagTransformFunction;
  
  /** Function to set attributes on style elements */
  setAttributes: SetAttributesFunction;
  
  /** Function to insert style elements into the DOM */
  insert: InsertFunction;
  
  /** DOM manipulation API used for style operations */
  domAPI: DOMAPIFunction;
  
  /** Function to create and insert style elements */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Function type for transforming style tag content
 */
type StyleTagTransformFunction = () => void;

/**
 * Function type for setting attributes on DOM elements
 */
type SetAttributesFunction = () => void;

/**
 * Function type for inserting elements into the DOM
 * @param target - The target selector or element where styles should be inserted
 */
type InsertFunction = (target: string) => void;

/**
 * Function type for DOM API operations
 */
type DOMAPIFunction = () => void;

/**
 * Function type for creating and inserting style elements
 */
type InsertStyleElementFunction = () => void;

/**
 * CSS Module locals interface
 * Maps CSS class names to their processed/hashed equivalents
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * CSS Module export interface
 * Represents the structure returned by imported CSS modules
 */
interface CSSModuleExport {
  /** Map of original class names to their scoped/hashed versions */
  locals?: CSSModuleLocals;
  
  /** Additional properties from the CSS module */
  [key: string]: unknown;
}

/**
 * Default export: CSS Module class name mappings
 * 
 * Returns an object mapping CSS class names to their scoped versions,
 * or undefined if no locals are available.
 * 
 * @example
 *