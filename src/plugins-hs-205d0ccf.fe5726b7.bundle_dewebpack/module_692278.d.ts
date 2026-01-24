/**
 * CSS Modules Style Loader Configuration
 * 
 * This module handles CSS/style injection into the DOM using various loaders and transformers.
 * It exports CSS module locals (class names) and re-exports all named exports from the style module.
 */

/**
 * Style loader options for DOM manipulation and CSS injection
 */
export interface StyleLoaderOptions {
  /**
   * Transform function to apply styles to the DOM (e.g., style-tag-transform)
   */
  styleTagTransform: StyleTagTransformFunction;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: SetAttributesFunction;
  
  /**
   * Function to insert style elements into the DOM
   * Bound to insert into "head" element
   */
  insert: InsertFunction;
  
  /**
   * DOM API utilities for style manipulation
   */
  domAPI: DOMAPIFunction;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Transforms and applies styles to style tags in the DOM
 */
export type StyleTagTransformFunction = (css: string, styleElement: HTMLStyleElement) => void;

/**
 * Sets attributes on style elements (e.g., nonce, data attributes)
 */
export type SetAttributesFunction = (element: HTMLElement) => void;

/**
 * Inserts a style element into a target container
 * @param target - Target container selector or element
 * @param element - Style element to insert
 */
export type InsertFunction = (target: string | HTMLElement, element: HTMLElement) => void;

/**
 * DOM API for adding/removing CSS from style elements
 */
export type DOMAPIFunction = (element: HTMLStyleElement, options: StyleLoaderOptions) => {
  update: (css: string) => void;
  remove: () => void;
};

/**
 * Creates and returns a style element for CSS injection
 */
export type InsertStyleElementFunction = (options: StyleLoaderOptions) => HTMLStyleElement;

/**
 * CSS Modules locals - maps local class names to generated class names
 */
export interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Default export: CSS Module locals (class name mappings)
 * Returns undefined if no locals are defined
 */
declare const _default: CSSModuleLocals | undefined;
export default _default;