/**
 * CSS Module Type Definitions
 * 
 * This module exports type definitions for a CSS module with style injection capabilities.
 * It represents a webpack-bundled CSS module that supports style-tag transformation,
 * DOM manipulation, and CSS class name exports.
 */

/**
 * CSS class names exported by the module.
 * Maps CSS class names to their transformed/scoped versions.
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Options for style injection into the DOM
 */
export interface StyleInjectionOptions {
  /**
   * Function to transform and inject styles into style tags
   */
  styleTagTransform: () => StyleTagTransformer;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => AttributeSetter;
  
  /**
   * Function to insert style elements into the specified container
   * @param container - The DOM container (e.g., "head")
   */
  insert: (container: string) => ElementInserter;
  
  /**
   * DOM API utilities for style manipulation
   */
  domAPI: () => DOMAPIUtilities;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => StyleElementInserter;
}

/**
 * Function that transforms CSS text into style tags
 */
export type StyleTagTransformer = (css: string, options?: unknown) => void;

/**
 * Function that sets attributes on style elements
 */
export type AttributeSetter = (element: HTMLStyleElement, attributes: Record<string, string>) => void;

/**
 * Function that inserts elements into the DOM
 */
export type ElementInserter = (element: HTMLElement) => void;

/**
 * DOM manipulation utilities
 */
export interface DOMAPIUtilities {
  update?: (element: HTMLElement) => void;
  remove?: (element: HTMLElement) => void;
}

/**
 * Function that creates and inserts style elements
 */
export type StyleElementInserter = (css: string) => HTMLStyleElement;

/**
 * CSS Module export structure
 */
export interface CSSModule {
  /**
   * Local CSS class names (scoped/transformed)
   */
  locals?: CSSModuleClasses;
  
  /**
   * Raw CSS content
   */
  css?: string;
  
  /**
   * Additional module metadata
   */
  [key: string]: unknown;
}

/**
 * Default export: CSS module class names or undefined if no locals exist
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;