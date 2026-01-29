/**
 * CSS Module type definitions
 * 
 * This module exports CSS class name mappings for a CSS/SCSS module.
 * The actual styles are injected into the DOM via style-loader.
 */

/**
 * CSS Module class name mapping
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Style loader configuration options
 */
export interface StyleLoaderOptions {
  /**
   * Function to transform and insert style tags into the DOM
   */
  styleTagTransform: StyleTagTransformFunction;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: SetAttributesFunction;
  
  /**
   * Function to insert style elements into a specific DOM location
   */
  insert: InsertFunction;
  
  /**
   * DOM manipulation API for style injection
   */
  domAPI: DOMAPIFunction;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Transforms CSS content and inserts it as a style tag
 */
export type StyleTagTransformFunction = (css: string, styleElement: HTMLStyleElement) => void;

/**
 * Sets attributes on a style element
 */
export type SetAttributesFunction = (element: HTMLElement) => void;

/**
 * Inserts a style element into the DOM at a specified location
 */
export type InsertFunction = (element: HTMLElement) => void;

/**
 * DOM API for manipulating styles
 */
export type DOMAPIFunction = (options: unknown) => void;

/**
 * Creates and inserts a style element
 */
export type InsertStyleElementFunction = (options: unknown) => HTMLStyleElement;

/**
 * CSS Module with optional locals (class name mappings)
 */
export interface CSSModule {
  /**
   * Local class name mappings (hashed CSS class names)
   */
  readonly locals?: CSSModuleClasses;
}

/**
 * Default export: CSS class name mappings for this module
 * Returns undefined if no local class names are defined
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

export default cssModuleLocals;