/**
 * CSS Module type definitions
 * Provides type-safe access to CSS module class names and style injection utilities
 */

/**
 * Style loader configuration options
 * Used to configure how styles are injected into the DOM
 */
interface StyleLoaderOptions {
  /** Transform function that handles style tag creation and insertion */
  styleTagTransform: StyleTagTransformFunction;
  
  /** Function to set attributes on style elements */
  setAttributes: SetAttributesFunction;
  
  /** Function to insert style elements into the DOM */
  insert: InsertFunction;
  
  /** DOM API utilities for style manipulation */
  domAPI: DOMAPIFunction;
  
  /** Function to create style elements */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Transforms and applies styles to style tags
 */
type StyleTagTransformFunction = () => (css: string, styleElement: HTMLStyleElement) => void;

/**
 * Sets attributes on style elements
 */
type SetAttributesFunction = () => (element: HTMLElement, options?: Record<string, string>) => void;

/**
 * Inserts elements into a specified position in the DOM
 * @param position - Target position in the DOM (e.g., "head")
 * @param element - Element to insert
 */
type InsertFunction = (position: string, element: HTMLElement) => void;

/**
 * DOM manipulation API for style handling
 */
type DOMAPIFunction = () => {
  update: (obj: StyleModule) => void;
  remove: (obj: StyleModule) => void;
};

/**
 * Creates and returns a style element
 */
type InsertStyleElementFunction = () => (options: Record<string, unknown>) => HTMLStyleElement;

/**
 * Style module metadata
 */
interface StyleModule {
  id: string | number;
  css: string;
  media?: string;
  sourceMap?: unknown;
}

/**
 * CSS Module locals object containing class name mappings
 */
type CSSModuleLocals = Record<string, string> | undefined;

/**
 * Default export: CSS module class names
 * Contains mappings from JavaScript identifiers to generated CSS class names
 */
declare const cssModuleLocals: CSSModuleLocals;

export default cssModuleLocals;

/**
 * Re-exports all named exports from the original CSS module
 * Includes any additional metadata or utilities provided by the module
 */
export * from './style-module';