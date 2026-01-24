/**
 * CSS Module Loader Type Definitions
 * Defines types for a webpack-compiled CSS module with style injection
 */

/**
 * CSS module class name mappings
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Style loader options for injecting CSS into the DOM
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
   * Inserts style elements into the specified container
   */
  insert: InsertFunction;
  
  /**
   * DOM API for style manipulation
   */
  domAPI: DOMAPIFunction;
  
  /**
   * Creates and configures style elements
   */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Function that transforms style tags
 */
export type StyleTagTransformFunction = (css: string, styleElement: HTMLStyleElement) => void;

/**
 * Function that sets attributes on style elements
 */
export type SetAttributesFunction = (element: HTMLStyleElement) => void;

/**
 * Function that inserts style elements into the DOM
 * @param target - The container element selector or element
 * @param options - Style element to insert
 */
export type InsertFunction = (target: string, options: HTMLStyleElement) => void;

/**
 * Function that provides DOM manipulation API
 */
export type DOMAPIFunction = (options: StyleLoaderOptions) => void;

/**
 * Function that creates style elements
 */
export type InsertStyleElementFunction = (options: StyleLoaderOptions) => HTMLStyleElement;

/**
 * CSS module with metadata
 */
export interface CSSModule {
  /**
   * The actual CSS class name mappings (if CSS modules are enabled)
   */
  readonly locals?: CSSModuleClasses;
  
  /**
   * Module metadata
   */
  readonly [key: string]: unknown;
}

/**
 * Default export: CSS module class mappings or undefined if not using CSS modules
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;

/**
 * Re-exported types and utilities from the underlying CSS module system
 */
export * from './css-module-types';