/**
 * Style loader module configuration for CSS-in-JS
 * Handles style injection and management in the DOM
 */

/**
 * Configuration options for style loading and injection
 */
interface StyleLoaderOptions {
  /** Transform function to apply to style tags before insertion */
  styleTagTransform: StyleTagTransformFunction;
  
  /** Function to set attributes on style elements */
  setAttributes: SetAttributesFunction;
  
  /** Function to insert style elements into the DOM */
  insert: InsertFunction;
  
  /** DOM manipulation API wrapper */
  domAPI: DOMAPIFunction;
  
  /** Function to create and insert style elements */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Function that transforms style content before insertion
 */
type StyleTagTransformFunction = (css: string, styleElement: HTMLStyleElement) => void;

/**
 * Function that sets custom attributes on style elements
 */
type SetAttributesFunction = (element: HTMLElement, attributes?: Record<string, string>) => void;

/**
 * Function that inserts elements into a specific DOM location
 */
type InsertFunction = (element: HTMLElement) => void;

/**
 * DOM manipulation API for style operations
 */
type DOMAPIFunction = (options: DOMAPIOptions) => DOMAPIInstance;

/**
 * Options passed to the DOM API
 */
interface DOMAPIOptions {
  /** The style element to manipulate */
  styleElement: HTMLStyleElement;
  
  /** CSS content to apply */
  content: string;
  
  /** Optional attributes to set */
  attributes?: Record<string, string>;
}

/**
 * Instance returned by DOM API for managing styles
 */
interface DOMAPIInstance {
  /** Update the style content */
  update: (content: string) => void;
  
  /** Remove the style element from DOM */
  remove: () => void;
}

/**
 * Function that creates and inserts style elements
 */
type InsertStyleElementFunction = (options: InsertStyleElementOptions) => HTMLStyleElement;

/**
 * Options for inserting style elements
 */
interface InsertStyleElementOptions {
  /** CSS content to insert */
  content: string;
  
  /** Optional attributes to set on the element */
  attributes?: Record<string, string>;
}

/**
 * Style module with optional CSS locals (CSS Modules class names)
 */
interface StyleModule {
  /** CSS Module class name mappings */
  locals?: Record<string, string>;
  
  /** Additional module metadata */
  [key: string]: unknown;
}

/**
 * Re-exported types and utilities from the style loader module
 */
export * from './style-loader-types';

/**
 * Default export: CSS Module locals or undefined if not using CSS Modules
 * Contains the mapping of local class names to generated unique class names
 */
declare const locals: Record<string, string> | undefined;

export default locals;