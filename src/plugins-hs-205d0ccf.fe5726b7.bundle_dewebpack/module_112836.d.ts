/**
 * CSS Module type definitions
 * 
 * This module exports CSS class names as a typed object and re-exports
 * utilities from the style-loader ecosystem.
 */

/**
 * CSS Modules class name mapping
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style loader configuration options
 */
export interface StyleLoaderOptions {
  /** Transform function to apply style tags to the DOM */
  styleTagTransform: StyleTagTransformFn;
  /** Function to set attributes on style elements */
  setAttributes: SetAttributesFn;
  /** Function to insert style elements into the DOM */
  insert: InsertFn;
  /** DOM API utilities for style manipulation */
  domAPI: DOMAPIFn;
  /** Function to create and insert style elements */
  insertStyleElement: InsertStyleElementFn;
}

/**
 * Transforms and applies styles to style tags
 */
export type StyleTagTransformFn = (css: string, styleElement: HTMLStyleElement) => void;

/**
 * Sets attributes on style elements
 */
export type SetAttributesFn = (element: HTMLElement) => void;

/**
 * Inserts elements into a specific DOM location
 */
export type InsertFn = (target: string, element: HTMLElement) => void;

/**
 * DOM manipulation API for styles
 */
export type DOMAPIFn = (options: StyleLoaderOptions) => void;

/**
 * Creates and inserts a style element
 */
export type InsertStyleElementFn = (options: StyleLoaderOptions) => HTMLStyleElement;

/**
 * CSS Module exports with locals (class names)
 */
export interface CSSModuleExports {
  locals?: CSSModuleClasses;
  [key: string]: unknown;
}

/**
 * Default export: CSS class name mappings or undefined
 * Returns the locally scoped class names if CSS Modules is enabled
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

export default cssModuleLocals;

/**
 * Re-exported utilities from style-loader dependencies
 * (Exact exports depend on module 541287's actual exports)
 */
export * from './style-loader-utils';