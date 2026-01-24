/**
 * CSS Module Type Definitions
 * 
 * This module provides type definitions for a CSS-in-JS module loader.
 * It handles style injection and management in a web application.
 */

/**
 * Configuration object for style injection
 * Contains methods and settings for DOM manipulation and style management
 */
interface StyleLoaderConfig {
  /** Transform function for style tags before insertion */
  styleTagTransform: StyleTagTransformFunction;
  
  /** Function to set attributes on style elements */
  setAttributes: SetAttributesFunction;
  
  /** Function to insert style elements into the DOM */
  insert: InsertFunction;
  
  /** API for DOM operations */
  domAPI: DOMAPIFunction;
  
  /** Function to create and insert style elements */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Transform function for processing style content
 * @param css - The CSS content to transform
 * @param styleElement - The style element to apply transformations to
 */
type StyleTagTransformFunction = (css: string, styleElement: HTMLStyleElement) => void;

/**
 * Function to set attributes on a style element
 * @param element - The style element to modify
 */
type SetAttributesFunction = (element: HTMLStyleElement) => void;

/**
 * Function to insert a style element into a specified position in the DOM
 * @param element - The style element to insert
 */
type InsertFunction = (element: HTMLStyleElement) => void;

/**
 * Function providing DOM manipulation API
 * @param element - The element to manipulate
 * @param options - Configuration options for DOM operations
 */
type DOMAPIFunction = (element: HTMLStyleElement, options?: Record<string, unknown>) => void;

/**
 * Function to create and insert a style element
 * @returns The created style element
 */
type InsertStyleElementFunction = () => HTMLStyleElement;

/**
 * CSS Module with optional locals (class name mappings)
 */
interface CSSModule {
  /** Class name mappings for CSS modules */
  locals?: Record<string, string>;
  
  /** Additional module properties */
  [key: string]: unknown;
}

/**
 * Default export: CSS class name mappings
 * Returns the local class names if available, otherwise undefined
 */
declare const cssModuleExports: Record<string, string> | undefined;

export default cssModuleExports;

/**
 * Re-exported members from the CSS module
 * Includes all named exports except 'default'
 */
export * from './css-module';