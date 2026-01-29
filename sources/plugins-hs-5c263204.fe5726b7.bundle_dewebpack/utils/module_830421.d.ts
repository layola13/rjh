/**
 * CSS Module Loader Configuration
 * Handles dynamic stylesheet injection and management
 */

/**
 * Style injection configuration options
 */
interface StyleLoaderOptions {
  /** Transform function applied to style tags before injection */
  styleTagTransform: StyleTagTransformFunction;
  
  /** Function to set attributes on style elements */
  setAttributes: SetAttributesFunction;
  
  /** Function to insert style elements into the DOM */
  insert: InsertFunction;
  
  /** DOM manipulation API interface */
  domAPI: DomAPIFunction;
  
  /** Function to create and insert style elements */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * CSS module locals (class name mappings)
 */
type CSSModuleLocals = Record<string, string> | undefined;

/**
 * Transforms style tag content before injection
 */
type StyleTagTransformFunction = () => (css: string, styleElement: HTMLStyleElement) => void;

/**
 * Sets custom attributes on style elements
 */
type SetAttributesFunction = () => (element: HTMLElement, options?: Record<string, unknown>) => void;

/**
 * Inserts style elements into specified DOM location
 * @param target - CSS selector or DOM element where styles should be inserted
 * @param element - The style element to insert
 */
type InsertFunction = (target: string, element: HTMLElement) => void;

/**
 * DOM manipulation API for style injection
 */
type DomAPIFunction = () => {
  update: (obj: StyleObject) => void;
  remove: (obj: StyleObject) => void;
};

/**
 * Creates and returns a style element
 */
type InsertStyleElementFunction = () => (options: Record<string, unknown>) => HTMLStyleElement;

/**
 * Style object containing CSS content and metadata
 */
interface StyleObject {
  id: string | number;
  css: string;
  media?: string;
  sourceMap?: unknown;
}

/**
 * CSS Module export interface
 */
interface CSSModule {
  /** Local class name mappings for CSS modules */
  locals?: CSSModuleLocals;
  
  /** Module identifier */
  id?: string | number;
  
  /** CSS content */
  toString?: () => string;
}

/**
 * Default export: CSS module locals (mapped class names)
 * Returns the local class name mappings if available, otherwise undefined
 */
declare const cssModuleLocals: CSSModuleLocals;

export default cssModuleLocals;

/**
 * Re-exported members from the underlying CSS module
 */
export * from './underlying-css-module';