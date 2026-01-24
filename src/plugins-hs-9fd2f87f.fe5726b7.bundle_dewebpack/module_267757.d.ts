/**
 * CSS Module Type Definitions
 * 
 * This module provides type definitions for a CSS-in-JS module loader.
 * It handles style injection, transformation, and management in the browser.
 */

/**
 * Configuration options for style injection and management
 */
interface StyleLoaderOptions {
  /** Transform function to process style tags before insertion */
  styleTagTransform: StyleTagTransformFunction;
  
  /** Function to set attributes on style elements */
  setAttributes: SetAttributesFunction;
  
  /** Function to insert style elements into the DOM */
  insert: InsertFunction;
  
  /** DOM manipulation API interface */
  domAPI: DomAPIInterface;
  
  /** Function to create and insert style elements */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Function type for transforming style content before injection
 */
type StyleTagTransformFunction = (css: string, styleElement: HTMLStyleElement) => void;

/**
 * Function type for setting attributes on style elements
 */
type SetAttributesFunction = (styleElement: HTMLStyleElement) => void;

/**
 * Function type for inserting elements into a specific DOM location
 * @param target - The target selector or element (e.g., "head")
 * @param element - The element to insert
 */
type InsertFunction = (target: string | HTMLElement, element: HTMLElement) => void;

/**
 * Interface for DOM manipulation operations
 */
interface DomAPIInterface {
  /** Update style content in the DOM */
  update: (element: HTMLStyleElement, css: string) => void;
  
  /** Remove style element from the DOM */
  remove: (element: HTMLStyleElement) => void;
}

/**
 * Function type for creating and inserting style elements
 */
type InsertStyleElementFunction = (options: StyleInsertionOptions) => HTMLStyleElement;

/**
 * Options for style element insertion
 */
interface StyleInsertionOptions {
  /** CSS content to inject */
  css: string;
  
  /** Additional attributes for the style element */
  attributes?: Record<string, string>;
}

/**
 * CSS Module export structure
 */
interface CSSModuleExport {
  /** Class name mappings for CSS modules */
  locals?: Record<string, string>;
  
  /** Additional exported values from the CSS module */
  [key: string]: unknown;
}

/**
 * Default export: CSS module class name mappings
 * Returns the local class names object if available, otherwise undefined
 */
declare const cssModuleLocals: Record<string, string> | undefined;

export default cssModuleLocals;

/**
 * Re-exported members from the underlying CSS module loader
 */
export * from './style-loader-runtime';