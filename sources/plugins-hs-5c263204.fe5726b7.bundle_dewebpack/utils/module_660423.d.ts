/**
 * CSS Module loader type definitions
 * 
 * This module handles CSS module imports with style injection capabilities.
 * It processes CSS modules and returns an object containing the generated class name mappings.
 */

/**
 * Configuration options for style injection and DOM manipulation
 */
interface StyleLoaderOptions {
  /** Transform function applied to style tags before insertion */
  styleTagTransform: StyleTagTransformFunction;
  
  /** Function to set attributes on style elements */
  setAttributes: SetAttributesFunction;
  
  /** Function to insert style elements into the DOM */
  insert: InsertFunction;
  
  /** API for DOM manipulation operations */
  domAPI: DOMAPIFunction;
  
  /** Function to create and insert style elements */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Function that transforms style content before injection
 */
type StyleTagTransformFunction = () => (css: string, styleElement: HTMLStyleElement) => void;

/**
 * Function that sets attributes on style elements
 */
type SetAttributesFunction = () => (styleElement: HTMLStyleElement) => void;

/**
 * Function that inserts elements into a specific DOM location
 * @param target - CSS selector or element reference for insertion point
 * @param element - The element to insert
 */
type InsertFunction = (target: string | HTMLElement, element: HTMLElement) => void;

/**
 * API for DOM manipulation operations
 */
type DOMAPIFunction = () => {
  update: (obj: StyleModule) => void;
  remove: (obj: StyleModule) => void;
};

/**
 * Function that creates and inserts a style element
 */
type InsertStyleElementFunction = () => (options: StyleLoaderOptions) => HTMLStyleElement;

/**
 * Represents a CSS module with its content and metadata
 */
interface StyleModule {
  /** Module identifier */
  id: string;
  
  /** CSS content */
  content: string;
  
  /** Media query conditions */
  media?: string;
  
  /** Source map data */
  sourceMap?: unknown;
  
  /** CSS class name mappings (locals) */
  locals?: Record<string, string>;
}

/**
 * Re-exported named exports from the CSS module
 * Contains all exported class names and identifiers
 */
export * from './css-module';

/**
 * Default export: CSS module class name mappings
 * 
 * Returns an object mapping local class names to their generated equivalents,
 * or undefined if no locals are defined in the module.
 * 
 * @example
 *