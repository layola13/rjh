/**
 * CSS Module Type Definitions
 * 
 * This module provides type definitions for a CSS-in-JS style loader module.
 * It handles dynamic style injection into the DOM with support for various
 * transformation and insertion strategies.
 */

/**
 * Configuration options for style injection
 */
interface StyleInjectionOptions {
  /**
   * Function to transform style tags before insertion
   * Handles post-processing of style elements
   */
  styleTagTransform: () => StyleTagTransformer;

  /**
   * Function to set custom attributes on style elements
   * Used for CSP nonces, data attributes, etc.
   */
  setAttributes: () => AttributeSetter;

  /**
   * Function to determine where to insert style elements
   * Bound to insert into document head by default
   */
  insert: (target: string) => StyleInserter;

  /**
   * DOM manipulation API for cross-browser compatibility
   */
  domAPI: () => DOMStyleAPI;

  /**
   * Function to create and insert style elements into the DOM
   */
  insertStyleElement: () => StyleElementInserter;
}

/**
 * Type for style tag transformation functions
 */
type StyleTagTransformer = (element: HTMLStyleElement) => void;

/**
 * Type for attribute setter functions
 */
type AttributeSetter = (element: HTMLStyleElement) => void;

/**
 * Type for style insertion functions
 */
type StyleInserter = (element: HTMLStyleElement) => void;

/**
 * DOM API for style manipulation
 */
interface DOMStyleAPI {
  /**
   * Insert a style element into the DOM
   */
  insertStyleElement(options: StyleInsertOptions): HTMLStyleElement;
  
  /**
   * Remove a style element from the DOM
   */
  removeStyleElement(element: HTMLStyleElement): void;
}

/**
 * Options for inserting style elements
 */
interface StyleInsertOptions {
  /**
   * CSS text content to inject
   */
  css: string;
  
  /**
   * Optional media query for the style element
   */
  media?: string;
  
  /**
   * Custom attributes to set on the style element
   */
  attributes?: Record<string, string>;
}

/**
 * Type for style element insertion functions
 */
type StyleElementInserter = (css: string, options?: StyleInsertOptions) => HTMLStyleElement;

/**
 * CSS Module locals/exports
 * Contains the transformed class names and identifiers from the CSS module
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * CSS Module Export
 * The default export may be the CSS module locals object, or undefined
 * if the module has no local class names
 */
declare const cssModuleExport: CSSModuleLocals | undefined;

export default cssModuleExport;

/**
 * Re-exports all named exports from the original CSS module
 * This allows importing specific class names directly
 */
export * from './original-css-module';