/**
 * CSS Module loader type definitions
 * Handles dynamic CSS injection and style management in webpack bundles
 */

/**
 * CSS Module class name mappings
 * Maps local class names to their hashed/scoped equivalents
 */
export interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style loader API options
 * Configuration for injecting and managing styles in the DOM
 */
export interface StyleLoaderOptions {
  /**
   * Transform function applied to style tags before insertion
   */
  styleTagTransform: StyleTagTransformFunction;
  
  /**
   * Sets attributes on style elements
   */
  setAttributes: SetAttributesFunction;
  
  /**
   * Inserts style elements into specified DOM location
   */
  insert: InsertFunction;
  
  /**
   * DOM manipulation API wrapper
   */
  domAPI: DOMAPIFunction;
  
  /**
   * Creates and returns a style element
   */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Transforms style content before injection
 */
export type StyleTagTransformFunction = (css: string, styleElement: HTMLStyleElement) => void;

/**
 * Sets custom attributes on style elements
 */
export type SetAttributesFunction = (styleElement: HTMLStyleElement) => void;

/**
 * Inserts a style element into the DOM at the specified location
 * @param target - Target selector or element (e.g., "head")
 * @param styleElement - The style element to insert
 */
export type InsertFunction = (target: string, styleElement: HTMLStyleElement) => void;

/**
 * Provides DOM manipulation utilities
 */
export type DOMAPIFunction = (options: unknown) => void;

/**
 * Creates and returns a new style element
 */
export type InsertStyleElementFunction = (options: unknown) => HTMLStyleElement;

/**
 * CSS Module export structure
 * Contains both the style content and local class name mappings
 */
export interface CSSModuleExport {
  /**
   * Local class name mappings (if CSS Modules are enabled)
   */
  locals?: CSSModuleLocals;
  
  /**
   * Raw CSS content or style metadata
   */
  [key: string]: unknown;
}

/**
 * Default export: CSS Module locals (class name mappings)
 * Returns undefined if CSS Modules are not enabled
 */
declare const cssModuleLocals: CSSModuleLocals | undefined;

export default cssModuleLocals;