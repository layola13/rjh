/**
 * Style loader module for CSS/style injection
 * Provides CSS module exports and style injection functionality
 */

/**
 * Style injection API configuration
 */
interface StyleLoaderAPI {
  /** Transform and inject style tag into DOM */
  styleTagTransform: StyleTagTransformFunction;
  /** Set attributes on style elements */
  setAttributes: SetAttributesFunction;
  /** Insert style element into specified location */
  insert: InsertFunction;
  /** DOM manipulation API */
  domAPI: DomAPIFunction;
  /** Create and insert style element */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Function to transform and inject style tags
 */
type StyleTagTransformFunction = (css: string, styleElement: HTMLStyleElement) => void;

/**
 * Function to set attributes on style elements
 */
type SetAttributesFunction = (element: HTMLElement, attributes: Record<string, string>) => void;

/**
 * Function to insert elements into DOM at specified location
 */
type InsertFunction = (element: HTMLElement, options?: InsertOptions) => void;

/**
 * Options for DOM insertion
 */
interface InsertOptions {
  target?: string | HTMLElement;
}

/**
 * DOM manipulation API function
 */
type DomAPIFunction = (update: (obj: StyleUpdateObject) => void) => void;

/**
 * Style update object structure
 */
interface StyleUpdateObject {
  css: string;
  media?: string;
  sourceMap?: unknown;
}

/**
 * Function to create and insert style elements
 */
type InsertStyleElementFunction = (options: StyleElementOptions) => HTMLStyleElement;

/**
 * Options for creating style elements
 */
interface StyleElementOptions {
  attributes?: Record<string, string>;
}

/**
 * CSS Module locals (class name mappings)
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * CSS Module export structure
 */
interface CSSModuleExport {
  locals?: CSSModuleLocals;
}

/**
 * Default export: CSS module class name mappings or undefined
 */
declare const _default: CSSModuleLocals | undefined;

export default _default;

/**
 * Re-export all named exports from the CSS module
 */
export * from './css-module-types';