/**
 * CSS Module Loader Type Definitions
 * 
 * This module provides type definitions for a CSS module loader that handles
 * style injection and management in a web application.
 */

/**
 * Style loader configuration options
 */
interface StyleLoaderOptions {
  /** Transform function for style tags */
  styleTagTransform: StyleTagTransformFunction;
  /** Function to set attributes on style elements */
  setAttributes: SetAttributesFunction;
  /** Function to insert style elements into the DOM */
  insert: InsertFunction;
  /** DOM API utilities for style manipulation */
  domAPI: DOMAPIFunction;
  /** Function to create and insert style elements */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Transforms style content before injection
 */
type StyleTagTransformFunction = () => (css: string, style: HTMLStyleElement) => void;

/**
 * Sets custom attributes on style elements
 */
type SetAttributesFunction = () => (style: HTMLStyleElement) => void;

/**
 * Inserts a style element into a specified DOM location
 * @param target - The target element or selector (e.g., "head")
 * @param style - The style element to insert
 */
type InsertFunction = (target: string, style: HTMLStyleElement) => void;

/**
 * Provides DOM manipulation utilities for styles
 */
type DOMAPIFunction = () => {
  update: (style: HTMLStyleElement, css: string) => void;
  remove: (style: HTMLStyleElement) => void;
};

/**
 * Creates and inserts a style element
 */
type InsertStyleElementFunction = () => HTMLStyleElement;

/**
 * CSS Module with optional locals (class name mappings)
 */
interface CSSModule {
  /** CSS content as string or array */
  toString(): string;
  /** Local class name mappings */
  locals?: Record<string, string>;
  [key: string]: unknown;
}

/**
 * Style loader function that processes CSS modules
 * @param module - The CSS module to process
 * @param options - Configuration options for style injection
 */
type StyleLoader = (module: CSSModule, options: StyleLoaderOptions) => void;

/**
 * CSS Module exports - contains the local class name mappings
 * or undefined if no locals are present
 */
type CSSModuleExports = Record<string, string> | undefined;

/**
 * Default export: CSS module locals (class name mappings)
 * Returns the locally scoped class names from the CSS module,
 * or undefined if the module has no local exports.
 */
declare const cssModuleLocals: CSSModuleExports;

export default cssModuleLocals;

/**
 * Re-exported members from the underlying CSS module
 * All named exports from the original module are available here
 */
export * from './cssModule';