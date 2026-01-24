/**
 * CSS Module Loader Type Definitions
 * 
 * This module provides TypeScript declarations for a dynamically loaded CSS module
 * with support for CSS Modules local class names and style injection.
 */

/**
 * CSS Modules class name mapping
 * Maps local class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Style injection configuration options
 */
export interface StyleLoaderOptions {
  /**
   * Transform function applied to style tags before insertion
   */
  styleTagTransform: StyleTagTransformFunction;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: SetAttributesFunction;
  
  /**
   * DOM insertion function specifying where styles should be injected
   */
  insert: InsertFunction;
  
  /**
   * DOM manipulation API adapter
   */
  domAPI: DOMApiFunction;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Transforms style content before injection into DOM
 */
export type StyleTagTransformFunction = (
  css: string,
  styleElement: HTMLStyleElement
) => void;

/**
 * Sets custom attributes on style elements
 */
export type SetAttributesFunction = (
  element: HTMLStyleElement,
  attributes?: Record<string, string>
) => void;

/**
 * Inserts style element into specified DOM location
 * @param target - DOM insertion target (e.g., "head", "body")
 * @param styleElement - The style element to insert
 */
export type InsertFunction = (
  target: string,
  styleElement: HTMLStyleElement
) => void;

/**
 * DOM manipulation abstraction layer
 */
export type DOMApiFunction = (
  options: unknown
) => {
  update: (obj: unknown) => void;
  remove: () => void;
};

/**
 * Creates and returns a new style element
 */
export type InsertStyleElementFunction = (
  options: unknown
) => HTMLStyleElement;

/**
 * CSS Module exports - either the class name mappings or undefined
 * Returns local class names if CSS Modules are enabled, otherwise undefined
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * Re-export all named exports from the original CSS module
 * (Typically empty for pure CSS modules, but may contain variables/functions)
 */
export * from './module_433579';