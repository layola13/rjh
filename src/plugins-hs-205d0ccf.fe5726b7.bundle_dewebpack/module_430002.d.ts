/**
 * CSS Module Loader
 * 
 * This module handles CSS-in-JS loading with style injection capabilities.
 * It provides runtime style management and CSS module locals extraction.
 */

/**
 * Configuration for style injection and DOM manipulation
 */
interface StyleLoaderOptions {
  /** Transform function to create and inject style tags */
  styleTagTransform: StyleTagTransformFunction;
  
  /** Function to set attributes on style elements */
  setAttributes: SetAttributesFunction;
  
  /** Function to insert style elements into the DOM */
  insert: InsertFunction;
  
  /** DOM API implementation for style manipulation */
  domAPI: DOMAPIFunction;
  
  /** Function to create style elements */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Function that transforms and injects CSS into the DOM
 */
type StyleTagTransformFunction = () => void;

/**
 * Function that sets attributes on style elements
 */
type SetAttributesFunction = () => void;

/**
 * Function that inserts elements into a specific DOM location
 * @param target - The target selector or element (e.g., "head")
 */
type InsertFunction = (target: string) => void;

/**
 * DOM API function for style manipulation
 */
type DOMAPIFunction = () => void;

/**
 * Function that creates and returns a style element
 */
type InsertStyleElementFunction = () => void;

/**
 * CSS Module locals type - contains className mappings
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * CSS Module export type with optional locals
 */
interface CSSModuleExport {
  locals?: CSSModuleLocals;
  [key: string]: unknown;
}

/**
 * Default export: CSS module locals (className mappings)
 * Returns undefined if no locals are defined
 */
declare const cssModuleLocals: CSSModuleLocals | undefined;

export default cssModuleLocals;

/**
 * Re-exported members from the CSS module
 * All named exports except 'default' are forwarded
 */
export * from './css-module-source';