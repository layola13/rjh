/**
 * CSS Module type definitions
 * This module handles style injection and exports CSS module class names
 */

/**
 * CSS Module class names mapping
 * Maps local class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style loader options for injecting styles into the DOM
 */
export interface StyleLoaderOptions {
  /**
   * Transforms style tags before insertion
   */
  styleTagTransform: StyleTagTransformFunction;
  
  /**
   * Sets attributes on style elements
   */
  setAttributes: SetAttributesFunction;
  
  /**
   * Inserts style elements into the DOM
   */
  insert: InsertFunction;
  
  /**
   * DOM manipulation API
   */
  domAPI: DOMAPIFunction;
  
  /**
   * Creates and inserts style elements
   */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Transforms style content before injection
 */
export type StyleTagTransformFunction = () => void;

/**
 * Sets custom attributes on style elements
 */
export type SetAttributesFunction = () => void;

/**
 * Inserts a style element into a specified container
 * @param container - Target DOM container (e.g., "head")
 */
export type InsertFunction = (container: string) => void;

/**
 * Provides DOM manipulation utilities
 */
export type DOMAPIFunction = () => void;

/**
 * Creates and inserts a style element
 */
export type InsertStyleElementFunction = () => void;

/**
 * CSS Module exports
 * Contains the class name mappings for this CSS module
 */
declare const cssModuleClasses: CSSModuleClasses | undefined;

export default cssModuleClasses;

/**
 * Re-exported style utilities (if any exist in the original module)
 */
export * from './style-utilities';