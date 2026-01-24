/**
 * CSS Module type definitions
 * This module represents a CSS-in-JS loader result with local class name mappings
 */

/**
 * CSS module class name mappings
 * Maps local class names to their hashed/scoped equivalents
 */
export interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style tag transformation function
 * Transforms and injects styles into the DOM
 */
export type StyleTagTransform = (css: string, style: HTMLStyleElement) => void;

/**
 * Set attributes function for style elements
 * Configures attributes on injected style tags
 */
export type SetAttributes = (element: HTMLElement, attributes?: Record<string, string>) => void;

/**
 * Insert function for DOM manipulation
 * Inserts style elements into specified target
 */
export type InsertFunction = (target: string, element: HTMLElement) => void;

/**
 * DOM API interface for style manipulation
 * Provides methods to interact with style elements in the DOM
 */
export type DomAPI = (element: HTMLElement, options?: unknown) => void;

/**
 * Insert style element function
 * Creates and returns a new style element
 */
export type InsertStyleElement = (options?: unknown) => HTMLElement;

/**
 * Style loader options configuration
 */
export interface StyleLoaderOptions {
  styleTagTransform: StyleTagTransform;
  setAttributes: SetAttributes;
  insert: InsertFunction;
  domAPI: DomAPI;
  insertStyleElement: InsertStyleElement;
}

/**
 * CSS Module exports
 * Default export contains the local class name mappings if available
 */
declare const cssModuleLocals: CSSModuleLocals | undefined;

export default cssModuleLocals;

/**
 * Re-export all named exports from the CSS module
 */
export * from './css-module-source';