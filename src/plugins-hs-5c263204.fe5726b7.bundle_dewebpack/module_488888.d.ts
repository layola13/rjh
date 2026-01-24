/**
 * CSS Module Loader
 * 
 * This module handles CSS style injection and provides CSS module locals.
 * It configures various style-related utilities including style tag transformation,
 * attribute setting, DOM API, and style element insertion.
 */

/**
 * Style loader configuration options
 */
export interface StyleLoaderOptions {
  /** Transform function for style tags */
  styleTagTransform: () => StyleTagTransformer;
  
  /** Function to set attributes on style elements */
  setAttributes: () => AttributeSetter;
  
  /** Function to insert style elements into the DOM */
  insert: InsertFunction;
  
  /** DOM manipulation API */
  domAPI: () => DOMApi;
  
  /** Function to create and insert style elements */
  insertStyleElement: () => StyleElementInserter;
}

/**
 * Style tag transformer function type
 */
export type StyleTagTransformer = (css: string, style: HTMLStyleElement) => void;

/**
 * Attribute setter function type
 */
export type AttributeSetter = (element: HTMLElement) => void;

/**
 * Insert function type - inserts elements into specified container
 */
export type InsertFunction = (element: HTMLElement) => void;

/**
 * DOM API for style manipulation
 */
export type DOMApi = {
  update: (element: HTMLElement, css: string) => void;
  remove: (element: HTMLElement) => void;
};

/**
 * Style element inserter function type
 */
export type StyleElementInserter = (options: unknown) => HTMLStyleElement;

/**
 * CSS Module locals - maps class names to hashed/scoped names
 */
export interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * CSS Module export type
 */
export interface CSSModule {
  /** Scoped class name mappings */
  locals?: CSSModuleLocals;
  
  /** Additional CSS module properties */
  [key: string]: unknown;
}

/**
 * Default export - CSS module locals or undefined if not available
 * 
 * @remarks
 * Returns the locals object containing scoped class names if the CSS module
 * has locals, otherwise returns undefined.
 */
declare const cssModuleExport: CSSModuleLocals | undefined;

export default cssModuleExport;

/**
 * Re-exported utilities from module 750157
 */
export * from './module_750157';