/**
 * CSS Module Type Definitions
 * Module ID: 984230
 * 
 * This module provides CSS-in-JS functionality with style injection capabilities.
 */

/**
 * Style loader configuration options
 */
interface StyleLoaderOptions {
  /** Transform function for style tags */
  styleTagTransform: () => StyleTagTransformFunction;
  
  /** Function to set attributes on style elements */
  setAttributes: () => SetAttributesFunction;
  
  /** DOM insertion strategy */
  insert: InsertFunction;
  
  /** DOM manipulation API */
  domAPI: () => DOMAPIFunction;
  
  /** Function to create and insert style elements */
  insertStyleElement: () => InsertStyleElementFunction;
}

/**
 * Transforms style content before injection
 */
type StyleTagTransformFunction = (css: string, style: HTMLStyleElement) => void;

/**
 * Sets custom attributes on style elements
 */
type SetAttributesFunction = (style: HTMLStyleElement) => void;

/**
 * Inserts style element into the DOM at specified location
 * @param target - Target selector or element (e.g., "head")
 * @param style - Style element to insert
 */
type InsertFunction = (target: string | HTMLElement, style: HTMLStyleElement) => void;

/**
 * Provides DOM manipulation methods for style injection
 */
type DOMAPIFunction = (options: StyleLoaderOptions) => DOMAPIInstance;

interface DOMAPIInstance {
  update: (obj: CSSModule) => void;
  remove: () => void;
}

/**
 * Creates and returns a style element
 */
type InsertStyleElementFunction = (options: StyleLoaderOptions) => HTMLStyleElement;

/**
 * CSS Module with optional locals (class name mappings)
 */
interface CSSModule {
  /** CSS content as string */
  toString(): string;
  
  /** Source map data */
  sourceMap?: string | object;
  
  /** CSS class name mappings for CSS Modules */
  locals?: Record<string, string>;
}

/**
 * Re-exported types from dependency module (149147)
 */
export * from './module_149147';

/**
 * Default export: CSS Module locals (class name mappings)
 * Returns undefined if CSS Modules are not enabled
 */
declare const locals: Record<string, string> | undefined;

export default locals;