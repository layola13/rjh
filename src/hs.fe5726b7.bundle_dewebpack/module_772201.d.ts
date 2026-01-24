/**
 * CSS Module Type Definitions
 * 
 * This module provides type definitions for a CSS modules loader configuration.
 * It handles style injection, DOM manipulation, and CSS class name exports.
 */

/**
 * Style loader options configuration
 * Controls how styles are injected and managed in the DOM
 */
export interface StyleLoaderOptions {
  /**
   * Transform function to process style tags before insertion
   * @param css - The CSS content to be transformed
   * @param styleElement - The style element that will contain the CSS
   */
  styleTagTransform: (css: string, styleElement: HTMLStyleElement) => void;

  /**
   * Function to set attributes on style elements
   * @param element - The style element to modify
   * @param options - Configuration options for the element
   */
  setAttributes: (element: HTMLElement, options: Record<string, unknown>) => void;

  /**
   * Function to insert style elements into the DOM
   * @param element - The element to be inserted
   */
  insert: (element: HTMLElement) => void;

  /**
   * DOM API utilities for style manipulation
   */
  domAPI: {
    update: (obj: StyleObject) => void;
    remove: (obj: StyleObject) => void;
  };

  /**
   * Function to create and insert style elements
   * @param options - Configuration for the style element
   */
  insertStyleElement: (options: StyleElementOptions) => HTMLStyleElement;
}

/**
 * Represents a style object tracked by the loader
 */
export interface StyleObject {
  id: string | number;
  element: HTMLStyleElement;
  refs: number;
  parts: StylePart[];
}

/**
 * Individual style part within a style object
 */
export interface StylePart {
  css: string;
  media?: string;
  sourceMap?: unknown;
}

/**
 * Options for creating style elements
 */
export interface StyleElementOptions {
  attributes?: Record<string, string>;
  insert?: string | ((element: HTMLElement) => void);
}

/**
 * CSS Modules locals - maps CSS class names to hashed identifiers
 * 
 * @example
 *