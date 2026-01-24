/**
 * CSS Module exports and style injection configuration
 * This module handles dynamic stylesheet injection and exports CSS module class names
 */

/**
 * CSS Module class name mappings
 * Maps semantic class names to their hashed/scoped equivalents
 */
declare const cssModuleLocals: Record<string, string> | undefined;

export default cssModuleLocals;

/**
 * Re-export all named exports from the CSS module
 * Allows direct import of individual class names
 */
export * from './css-module-source';

/**
 * Style injection configuration interface
 */
interface StyleLoaderConfig {
  /**
   * Transforms style tags before insertion (e.g., adds attributes, modifies content)
   */
  styleTagTransform: StyleTagTransformFunction;
  
  /**
   * Sets custom attributes on injected style elements
   */
  setAttributes: SetAttributesFunction;
  
  /**
   * Inserts style element into specified DOM location
   */
  insert: InsertFunction;
  
  /**
   * DOM manipulation API for style injection
   */
  domAPI: DOMAPIFunction;
  
  /**
   * Creates and configures the style element before insertion
   */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Function that transforms style content before injection
 */
type StyleTagTransformFunction = (css: string, styleElement: HTMLStyleElement) => void;

/**
 * Function that sets attributes on the style element
 */
type SetAttributesFunction = (styleElement: HTMLStyleElement) => void;

/**
 * Function that inserts style element into the DOM at specified target
 */
type InsertFunction = (target: string, styleElement: HTMLStyleElement) => void;

/**
 * DOM manipulation interface for style injection
 */
type DOMAPIFunction = (options: { styleElement: HTMLStyleElement; css: string }) => void;

/**
 * Function that creates a style element with given options
 */
type InsertStyleElementFunction = (options: { css: string }) => HTMLStyleElement;