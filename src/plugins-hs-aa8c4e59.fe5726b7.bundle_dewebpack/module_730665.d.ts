/**
 * CSS Module loader type definitions
 * 
 * This module represents a Webpack CSS module with CSS Modules support.
 * It provides typed access to CSS class names and handles style injection.
 */

/**
 * CSS Modules class name mapping
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Style loader configuration options
 */
interface StyleLoaderOptions {
  /** Transform function for style tag manipulation */
  styleTagTransform: StyleTagTransformFunction;
  /** Function to set attributes on style elements */
  setAttributes: SetAttributesFunction;
  /** Function to insert style elements into DOM */
  insert: InsertFunction;
  /** DOM API utilities for style manipulation */
  domAPI: DOMAPIFunction;
  /** Function to create and insert style elements */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Transforms style content before insertion
 */
type StyleTagTransformFunction = () => (css: string, element: HTMLStyleElement) => void;

/**
 * Sets attributes on style elements
 */
type SetAttributesFunction = () => (element: HTMLStyleElement) => void;

/**
 * Inserts style element into specified location
 */
type InsertFunction = (target: string) => (element: HTMLStyleElement) => void;

/**
 * DOM manipulation API for styles
 */
type DOMAPIFunction = () => {
  update: (element: HTMLStyleElement) => void;
  remove: (element: HTMLStyleElement) => void;
};

/**
 * Creates and inserts style elements
 */
type InsertStyleElementFunction = () => (options: unknown) => HTMLStyleElement;

/**
 * CSS module export with locals (class names)
 */
interface CSSModuleExport {
  readonly locals?: CSSModuleClasses;
}

/**
 * Re-exported bindings from the CSS module
 * All named exports except 'default' are forwarded
 */
export * from './css-module-source';

/**
 * Default export: CSS Modules class name mapping
 * 
 * @remarks
 * Returns the locally scoped class names if available, otherwise undefined.
 * This is the primary interface for accessing CSS Module class names in TypeScript.
 * 
 * @example
 *