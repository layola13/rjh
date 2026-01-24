/**
 * CSS module loader type definitions
 * Handles dynamic style injection and CSS module exports
 */

/**
 * CSS module class name mappings
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Style loader API configuration
 * Configures how styles are injected into the DOM
 */
export interface StyleLoaderAPI {
  /**
   * Transforms and injects style tags into the document
   */
  styleTagTransform: StyleTagTransformFunction;
  
  /**
   * Sets attributes on style elements (e.g., nonce, data-* attrs)
   */
  setAttributes: SetAttributesFunction;
  
  /**
   * Inserts style elements into a specific DOM location
   */
  insert: InsertFunction;
  
  /**
   * DOM manipulation API for style injection
   */
  domAPI: DOMAPIFunction;
  
  /**
   * Creates and inserts style elements
   */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Transforms style content before injection
 */
export type StyleTagTransformFunction = () => (css: string, style: HTMLStyleElement) => void;

/**
 * Sets custom attributes on style elements
 */
export type SetAttributesFunction = () => (element: HTMLStyleElement) => void;

/**
 * Inserts style element into specified container
 * @param target - CSS selector or element to insert into (e.g., "head")
 */
export type InsertFunction = (target: string, element: HTMLStyleElement) => void;

/**
 * DOM API for manipulating styles
 */
export type DOMAPIFunction = () => {
  update: (obj: StyleObject) => void;
  remove: () => void;
};

/**
 * Creates style element for injection
 */
export type InsertStyleElementFunction = () => HTMLStyleElement;

/**
 * Style object containing CSS content and metadata
 */
export interface StyleObject {
  css: string;
  media?: string;
  sourceMap?: unknown;
}

/**
 * CSS module export containing class mappings and metadata
 */
export interface CSSModuleExport {
  /**
   * Exported CSS class name mappings (locals)
   */
  locals?: CSSModuleClasses;
  
  /**
   * Raw CSS content
   */
  toString(): string;
}

/**
 * Default export: CSS module class name mappings
 * Returns undefined if no locals are defined
 */
declare const cssModuleClasses: CSSModuleClasses | undefined;

export default cssModuleClasses;

/**
 * Re-exports all named exports from the CSS module
 * Excludes the 'default' export to prevent conflicts
 */
export * from './module_632725';