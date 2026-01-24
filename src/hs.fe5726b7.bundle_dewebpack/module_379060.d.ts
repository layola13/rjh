/**
 * CSS Module Type Definitions
 * 
 * This module represents a CSS-in-JS or CSS module loader configuration.
 * It handles style injection, transformation, and provides typed access to CSS class names.
 */

/**
 * Style loader configuration options
 */
interface StyleLoaderOptions {
  /**
   * Transform function applied to style tags before insertion
   */
  styleTagTransform: StyleTagTransformFunction;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: SetAttributesFunction;
  
  /**
   * Function to insert style elements into the DOM
   * @param target - The target container (e.g., "head")
   */
  insert: InsertFunction;
  
  /**
   * DOM API adapter for cross-browser compatibility
   */
  domAPI: DOMAPIAdapter;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Transform function for style tag content
 */
type StyleTagTransformFunction = () => (css: string, style: HTMLStyleElement) => void;

/**
 * Function to set custom attributes on style elements
 */
type SetAttributesFunction = () => (element: HTMLStyleElement, options?: Record<string, string>) => void;

/**
 * Function to insert elements into a specific DOM location
 */
type InsertFunction = (target: string, element: HTMLStyleElement) => void;

/**
 * DOM manipulation adapter interface
 */
type DOMAPIAdapter = () => {
  update: (element: HTMLStyleElement) => void;
  remove: (element: HTMLStyleElement) => void;
};

/**
 * Function to create style elements
 */
type InsertStyleElementFunction = () => (options: unknown) => HTMLStyleElement;

/**
 * CSS Module locals - maps CSS class names to generated unique identifiers
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * CSS Module export structure
 */
interface CSSModule {
  /**
   * Object containing the mapping of local class names to their hashed versions
   */
  locals?: CSSModuleLocals;
  
  /**
   * Additional CSS module metadata or methods
   */
  [key: string]: unknown;
}

/**
 * Default export - the CSS module locals (class name mappings)
 * Returns undefined if no locals are defined
 */
declare const cssModuleExport: CSSModuleLocals | undefined;

export default cssModuleExport;

/**
 * Re-export all named exports from the underlying CSS module
 */
export * from './css-module-source';