/**
 * CSS Module loader type definitions
 * 
 * This module handles CSS module imports with style injection and HMR support.
 * It processes CSS modules and injects styles into the DOM at runtime.
 */

/**
 * CSS Modules class name mapping
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  readonly [key: string]: string;
}

/**
 * Style loader options for DOM manipulation and style injection
 */
export interface StyleLoaderOptions {
  /**
   * Transform function applied to style tags before insertion
   */
  styleTagTransform: StyleTagTransformFunction;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: SetAttributesFunction;
  
  /**
   * DOM insertion strategy function
   */
  insert: InsertFunction;
  
  /**
   * DOM API abstraction for style manipulation
   */
  domAPI: DOMAPIFunction;
  
  /**
   * Factory function to create style elements
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
export type SetAttributesFunction = (element: HTMLStyleElement) => void;

/**
 * Inserts style elements into the DOM at specified location
 */
export type InsertFunction = (element: HTMLStyleElement) => void;

/**
 * DOM manipulation API for style elements
 */
export type DOMAPIFunction = (options: unknown) => {
  update: (obj: CSSModule) => void;
  remove: () => void;
};

/**
 * Creates and returns a style element
 */
export type InsertStyleElementFunction = (options: unknown) => HTMLStyleElement;

/**
 * CSS Module export structure
 */
export interface CSSModule {
  /**
   * CSS content as string
   */
  readonly toString: () => string;
  
  /**
   * Module identifier
   */
  readonly id: string;
  
  /**
   * Class name mappings (if CSS Modules are enabled)
   */
  readonly locals?: CSSModuleClasses;
}

/**
 * Default export - CSS Module class names or undefined
 * 
 * When CSS Modules are enabled, exports an object mapping local class names
 * to their globally unique identifiers. Returns undefined if no locals exist.
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * Re-exports all named exports from the CSS module
 * Allows direct import of class names when using named exports
 */
export * from './css-module-source';