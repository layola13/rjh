/**
 * Style loader module configuration and exports
 * Handles CSS module injection and transformation
 */

/**
 * Configuration options for style injection
 */
interface StyleLoaderOptions {
  /**
   * Function to transform style tags before insertion
   */
  styleTagTransform: StyleTagTransformFunction;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: SetAttributesFunction;
  
  /**
   * Function to insert style elements into the DOM
   */
  insert: InsertFunction;
  
  /**
   * DOM API utilities for style manipulation
   */
  domAPI: DOMAPIUtilities;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Transform function for style tag content
 */
type StyleTagTransformFunction = (css: string, styleElement: HTMLStyleElement) => void;

/**
 * Function to set attributes on style elements
 */
type SetAttributesFunction = (element: HTMLStyleElement, attributes?: Record<string, string>) => void;

/**
 * Function to insert elements into a specified location
 */
type InsertFunction = (element: HTMLElement) => void;

/**
 * DOM manipulation utilities for styles
 */
interface DOMAPIUtilities {
  update: (element: HTMLStyleElement, css: string) => void;
  remove: (element: HTMLStyleElement) => void;
}

/**
 * Function to create and insert style elements
 */
type InsertStyleElementFunction = (options: StyleInsertOptions) => HTMLStyleElement;

/**
 * Options for style element insertion
 */
interface StyleInsertOptions {
  css: string;
  attributes?: Record<string, string>;
}

/**
 * CSS Module locals (class name mappings)
 */
type CSSModuleLocals = Record<string, string> | undefined;

/**
 * Default export: CSS module class name mappings
 * Returns an object mapping local class names to their hashed equivalents,
 * or undefined if no locals are defined
 */
declare const _default: CSSModuleLocals;
export default _default;

/**
 * Re-exported members from the underlying CSS module
 * All named exports from the original module are available here
 */
export * from 'cssModule';