/**
 * CSS Module Loader Type Definitions
 * 
 * This module handles CSS module loading and style injection.
 * Typically used in webpack-based applications for CSS-in-JS functionality.
 */

/**
 * CSS module class name mappings.
 * Maps local class names to their hashed/scoped equivalents.
 * 
 * @example
 * { 
 *   button: 'MyComponent_button__a1b2c',
 *   container: 'MyComponent_container__d3e4f'
 * }
 */
export interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style loader API for managing style tag transformations.
 */
export interface StyleTagTransformFunction {
  (css: string, styleElement: HTMLStyleElement): void;
}

/**
 * Function to set attributes on style elements.
 */
export interface SetAttributesFunction {
  (element: HTMLStyleElement, attributes: Record<string, string>): void;
}

/**
 * DOM API for style manipulation operations.
 */
export interface DOMAPIFunction {
  (element: HTMLStyleElement, options?: unknown): void;
}

/**
 * Function to insert style elements into the DOM.
 */
export interface InsertStyleElementFunction {
  (element: HTMLStyleElement): void;
}

/**
 * Function to determine where to insert style tags in the DOM.
 */
export interface InsertFunction {
  (element: HTMLStyleElement): void;
}

/**
 * Configuration options for the style loader.
 */
export interface StyleLoaderOptions {
  /** Transforms style content before injection */
  styleTagTransform: StyleTagTransformFunction;
  
  /** Sets custom attributes on style elements */
  setAttributes: SetAttributesFunction;
  
  /** Determines insertion point in DOM (e.g., 'head') */
  insert: InsertFunction;
  
  /** Provides DOM manipulation API */
  domAPI: DOMAPIFunction;
  
  /** Creates and configures style elements */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * CSS module export structure.
 */
export interface CSSModuleExport {
  /** Local class name mappings for CSS modules */
  locals?: CSSModuleLocals;
  
  /** Raw CSS content */
  toString(): string;
  
  /** Additional module metadata */
  [key: string]: unknown;
}

/**
 * Default export: CSS module class name mappings.
 * Returns undefined if no locals are defined.
 */
declare const cssModuleLocals: CSSModuleLocals | undefined;

export default cssModuleLocals;

/**
 * Re-exported members from the underlying CSS module.
 * All named exports except 'default' are re-exported here.
 */
export * from './style-module';