/**
 * CSS Module type definitions
 * 
 * This module handles CSS-in-JS integration with webpack style-loader.
 * It processes CSS modules and provides type-safe access to class names.
 */

/**
 * CSS Module class names mapping
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
  /** Function to insert styles into the DOM */
  insert: InsertFunction;
  /** DOM API implementation for style manipulation */
  domAPI: DOMAPIFunction;
  /** Function to create and insert style elements */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Transforms style tags in the DOM
 */
type StyleTagTransformFunction = () => void;

/**
 * Sets attributes on DOM elements
 */
type SetAttributesFunction = () => void;

/**
 * Inserts styles into a specific DOM location
 * @param target - Target DOM location (e.g., "head")
 */
type InsertFunction = (target: string) => void;

/**
 * Provides DOM manipulation API
 */
type DOMAPIFunction = () => void;

/**
 * Creates and inserts style elements into the DOM
 */
type InsertStyleElementFunction = () => void;

/**
 * CSS module exports with optional locals (class names)
 */
interface CSSModuleExports {
  /** Local class name mappings */
  locals?: CSSModuleClasses;
  /** Additional module exports */
  [key: string]: unknown;
}

/**
 * Default export: CSS module class names
 * Returns undefined if no local class names are defined
 */
declare const cssModuleClasses: CSSModuleClasses | undefined;

export default cssModuleClasses;

/**
 * Re-export all named exports from the CSS module
 * Excludes the 'default' export to avoid conflicts
 */
export * from './css-module-source';