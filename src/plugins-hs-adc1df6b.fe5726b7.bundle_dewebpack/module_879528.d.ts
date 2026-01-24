/**
 * CSS Module Type Definitions
 * 
 * This module represents a CSS-in-JS loader output that provides:
 * - Style injection capabilities
 * - CSS module class name mappings
 * - Runtime style transformation utilities
 */

/**
 * CSS Module class name mappings
 * Maps local class names to their hashed/scoped equivalents
 */
export interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style injection configuration options
 */
export interface StyleLoaderOptions {
  /**
   * Transform function applied to style tags before insertion
   */
  styleTagTransform: () => StyleTagTransformFunction;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => SetAttributesFunction;
  
  /**
   * Insertion point for style elements in the DOM
   */
  insert: InsertFunction;
  
  /**
   * DOM API implementation for style manipulation
   */
  domAPI: () => DOMAPIFunction;
  
  /**
   * Factory function to create style elements
   */
  insertStyleElement: () => InsertStyleElementFunction;
}

/**
 * Function that transforms style content before injection
 */
export type StyleTagTransformFunction = (css: string, element: HTMLStyleElement) => void;

/**
 * Function that sets attributes on a style element
 */
export type SetAttributesFunction = (element: HTMLStyleElement, options?: Record<string, unknown>) => void;

/**
 * Function that inserts a style element into the DOM
 */
export type InsertFunction = (element: HTMLStyleElement) => void;

/**
 * DOM API function for style element manipulation
 */
export type DOMAPIFunction = (options: StyleLoaderOptions) => void;

/**
 * Factory function that creates and returns a style element
 */
export type InsertStyleElementFunction = (options: StyleLoaderOptions) => HTMLStyleElement;

/**
 * CSS module export structure containing both locals and metadata
 */
export interface CSSModuleExport {
  /**
   * Local class name mappings (if CSS modules are enabled)
   */
  locals?: CSSModuleLocals;
  
  /**
   * Additional exported properties from the CSS module
   */
  [key: string]: unknown;
}

/**
 * Default export: CSS module class name mappings
 * Returns undefined if no CSS modules are used, otherwise returns the locals object
 */
declare const cssModuleLocals: CSSModuleLocals | undefined;

export default cssModuleLocals;

/**
 * Re-exported members from the CSS module (excluding 'default')
 */
export * from './css-module-source';