/**
 * CSS Module type definitions
 * 
 * This module provides TypeScript type definitions for a CSS module loader.
 * It handles style injection and exports CSS class names as a typed object.
 */

/**
 * CSS class name mappings exported by the CSS module.
 * Each key represents a class name defined in the CSS file,
 * mapped to its generated unique identifier.
 */
export type CSSModuleClasses = Record<string, string> | undefined;

/**
 * Configuration options for style injection
 */
export interface StyleLoaderOptions {
  /** Transform function to apply to style tags before insertion */
  styleTagTransform: StyleTagTransformFunction;
  
  /** Function to set attributes on style/link elements */
  setAttributes: SetAttributesFunction;
  
  /** Function to insert style elements into the DOM */
  insert: InsertFunction;
  
  /** DOM manipulation API */
  domAPI: DOMAPIFunction;
  
  /** Function to create and insert style elements */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Function that transforms style content before insertion
 */
export type StyleTagTransformFunction = (css: string, styleElement: HTMLStyleElement) => void;

/**
 * Function that sets attributes on style/link elements
 */
export type SetAttributesFunction = (element: HTMLElement) => void;

/**
 * Function that inserts elements into a specified location in the DOM
 */
export type InsertFunction = (element: HTMLElement) => void;

/**
 * DOM manipulation API for style injection
 */
export type DOMAPIFunction = (options: unknown) => void;

/**
 * Function that creates and inserts style elements
 */
export type InsertStyleElementFunction = (options: unknown) => HTMLStyleElement;

/**
 * CSS module metadata and content
 */
export interface CSSModule {
  /** The CSS content as a string or array */
  content?: string | unknown[];
  
  /** CSS class name mappings (hash map of original name to generated name) */
  locals?: CSSModuleClasses;
  
  /** Additional module metadata */
  [key: string]: unknown;
}

/**
 * Default export: CSS class name mappings from the module
 * 
 * @example
 *