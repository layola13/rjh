/**
 * Style loader module with CSS-in-JS injection utilities
 * Handles dynamic stylesheet insertion and management in the browser
 */

/**
 * Configuration object for style injection
 */
export interface StyleLoaderOptions {
  /** Transform function to modify style tags before insertion */
  styleTagTransform: StyleTagTransformFunction;
  
  /** Function to set attributes on style elements */
  setAttributes: SetAttributesFunction;
  
  /** Function to insert style elements into the DOM */
  insert: InsertFunction;
  
  /** DOM manipulation API wrapper */
  domAPI: DOMAPIFunction;
  
  /** Function to create and insert style elements */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Function type for transforming style tags
 */
export type StyleTagTransformFunction = (css: string, element: HTMLStyleElement) => void;

/**
 * Function type for setting attributes on DOM elements
 */
export type SetAttributesFunction = (element: HTMLElement, attributes: Record<string, string>) => void;

/**
 * Function type for inserting elements into the DOM
 * @param target - Target selector or element where styles should be inserted
 * @param element - The style element to insert
 */
export type InsertFunction = (target: string | HTMLElement, element: HTMLStyleElement) => void;

/**
 * Function type for DOM API operations
 */
export type DOMAPIFunction = (options: StyleLoaderOptions) => void;

/**
 * Function type for creating style elements
 */
export type InsertStyleElementFunction = (options: StyleLoaderOptions) => HTMLStyleElement;

/**
 * CSS module exports with typed class names
 */
export interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * CSS module object structure
 */
export interface CSSModule {
  locals?: CSSModuleLocals;
  [key: string]: unknown;
}

/**
 * Default export - CSS module locals (class name mappings)
 * Returns undefined if no locals are defined
 */
declare const cssModuleLocals: CSSModuleLocals | undefined;

export default cssModuleLocals;

/**
 * Re-exported utilities from the style loader module
 */
export * from './style-loader-utils';