/**
 * CSS Module Loader Type Definitions
 * 
 * This module handles CSS module imports with style injection capabilities.
 * It provides type-safe access to CSS class names exported as a locals object.
 */

/**
 * Configuration object for CSS module injection and processing
 */
interface CSSModuleOptions {
  /** Transform function to process style tags before insertion */
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
type StyleTagTransformFunction = () => (css: string, styleElement: HTMLStyleElement) => void;

/**
 * Function type for setting attributes on style elements
 */
type SetAttributesFunction = () => (element: HTMLElement, attributes: Record<string, string>) => void;

/**
 * Function type for inserting elements into a specific DOM location
 * @param target - The selector or element where styles should be inserted (e.g., "head")
 */
type InsertFunction = (target: string, element: HTMLElement) => void;

/**
 * Function type for DOM API operations
 */
type DOMAPIFunction = () => {
  update: (element: HTMLElement) => void;
  remove: (element: HTMLElement) => void;
};

/**
 * Function type for creating and inserting style elements
 */
type InsertStyleElementFunction = () => (css: string) => HTMLStyleElement;

/**
 * CSS Module locals object containing CSS class name mappings
 * Keys are the original class names from the CSS file
 * Values are the transformed/hashed class names for use in the DOM
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * CSS Module export type
 * Contains the processed CSS content and class name mappings
 */
interface CSSModule {
  /** The CSS module class name mappings, if available */
  locals?: CSSModuleLocals;
  
  /** Additional module metadata */
  [key: string]: unknown;
}

/**
 * Default export: CSS module locals object or undefined if no locals exist
 * 
 * This represents the transformed CSS class names that can be used in JavaScript/TypeScript
 * to reference styles in a type-safe manner.
 * 
 * @example
 *