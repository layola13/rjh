/**
 * CSS Module type definitions
 * 
 * This module represents a webpack CSS module loader configuration.
 * It exports CSS class name mappings and style injection utilities.
 */

/**
 * CSS class name mappings exported by the module.
 * Maps string keys to localized CSS class names.
 */
export type CSSModuleClasses = Record<string, string> | undefined;

/**
 * Style tag transformation function.
 * Handles how CSS is transformed before injection into the DOM.
 */
export type StyleTagTransformFn = (css: string, styleElement: HTMLStyleElement) => void;

/**
 * Function to set attributes on style elements.
 */
export type SetAttributesFn = (styleElement: HTMLStyleElement) => void;

/**
 * DOM API for manipulating style elements.
 */
export interface DomAPI {
  /**
   * Insert a style element into the DOM
   */
  insertStyleElement(options: StyleInsertOptions): HTMLStyleElement;
  
  /**
   * Remove a style element from the DOM
   */
  removeStyleElement(styleElement: HTMLStyleElement): void;
}

/**
 * Options for inserting styles into the DOM.
 */
export interface StyleInsertOptions {
  /**
   * CSS content to inject
   */
  css: string;
  
  /**
   * Optional attributes to set on the style element
   */
  attributes?: Record<string, string>;
}

/**
 * Function to insert style elements.
 * @param target - The target element selector or element (e.g., "head")
 * @param options - Style insertion options
 */
export type InsertFn = (target: string | HTMLElement, options: StyleInsertOptions) => void;

/**
 * Function to create and insert style elements into the DOM.
 */
export type InsertStyleElementFn = (options: StyleInsertOptions) => HTMLStyleElement;

/**
 * Configuration object for style loader.
 */
export interface StyleLoaderConfig {
  /**
   * Style tag transformation handler
   */
  styleTagTransform: StyleTagTransformFn;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: SetAttributesFn;
  
  /**
   * Function to insert styles into the DOM
   */
  insert: InsertFn;
  
  /**
   * DOM manipulation API
   */
  domAPI: DomAPI;
  
  /**
   * Function to insert style elements
   */
  insertStyleElement: InsertStyleElementFn;
}

/**
 * CSS Module with localized class names.
 * Typically contains a 'locals' property with class name mappings.
 */
export interface CSSModule {
  /**
   * Localized CSS class name mappings
   */
  locals?: Record<string, string>;
}

/**
 * Default export: CSS class name mappings from the module.
 * Returns undefined if no locals are defined.
 */
declare const cssModuleClasses: CSSModuleClasses;
export default cssModuleClasses;