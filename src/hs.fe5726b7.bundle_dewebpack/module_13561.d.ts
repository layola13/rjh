/**
 * CSS Module Loader Type Definitions
 * 
 * This module handles CSS module loading and style injection into the DOM.
 * It provides type-safe access to CSS class names exported from a CSS module.
 */

/**
 * Configuration options for CSS module style injection
 */
interface StyleLoaderOptions {
  /** Transform function to process style tags before insertion */
  styleTagTransform: StyleTagTransformFunction;
  
  /** Function to set attributes on style elements */
  setAttributes: SetAttributesFunction;
  
  /** Function to insert style elements into the DOM */
  insert: InsertFunction;
  
  /** DOM manipulation API abstraction */
  domAPI: DOMAPIFunction;
  
  /** Function to create and insert style elements */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Function type for transforming style tag content
 */
type StyleTagTransformFunction = () => (css: string, styleElement: HTMLStyleElement) => void;

/**
 * Function type for setting attributes on style elements
 */
type SetAttributesFunction = () => (styleElement: HTMLStyleElement) => void;

/**
 * Function type for inserting elements into the DOM
 * @param target - The target selector or element where styles should be inserted
 */
type InsertFunction = (target: string, styleElement: HTMLStyleElement) => void;

/**
 * DOM API abstraction function type
 */
type DOMAPIFunction = () => {
  update: (obj: CSSModule) => void;
  remove: () => void;
};

/**
 * Function type for creating and inserting style elements
 */
type InsertStyleElementFunction = () => HTMLStyleElement;

/**
 * CSS Module structure containing style content and source maps
 */
interface CSSModule {
  /** CSS content as string */
  toString(): string;
  
  /** Module identifier */
  id?: string;
  
  /** CSS class name mappings (locals) */
  locals?: Record<string, string>;
  
  /** Source map for debugging */
  sourceMap?: unknown;
}

/**
 * CSS class name mappings exported from the CSS module.
 * Maps semantic class names to their hashed/scoped equivalents.
 * 
 * @example
 *