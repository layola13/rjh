/**
 * CSS Module Type Definition
 * 
 * This module represents a CSS-in-JS implementation with style injection capabilities.
 * It exports CSS class names and provides runtime style tag management.
 */

/**
 * Configuration options for style injection and management
 */
interface StyleLoaderOptions {
  /** Transforms and applies styles to style tags */
  styleTagTransform: StyleTagTransformFunction;
  
  /** Sets attributes on style elements */
  setAttributes: SetAttributesFunction;
  
  /** Inserts style elements into the DOM */
  insert: InsertFunction;
  
  /** DOM manipulation API for style management */
  domAPI: DOMAPIFunction;
  
  /** Creates and inserts style elements */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Function type for transforming and applying styles to DOM
 */
type StyleTagTransformFunction = () => (css: string, styleElement: HTMLStyleElement) => void;

/**
 * Function type for setting attributes on style elements
 */
type SetAttributesFunction = () => (element: HTMLElement, options?: Record<string, string>) => void;

/**
 * Function type for inserting elements into a specific DOM location
 */
type InsertFunction = (selector: string) => (element: HTMLElement) => void;

/**
 * Function type for DOM API operations
 */
type DOMAPIFunction = () => {
  update: (obj: CSSModuleObject) => void;
  remove: () => void;
};

/**
 * Function type for creating style elements
 */
type InsertStyleElementFunction = () => (options: unknown) => HTMLStyleElement;

/**
 * Represents a CSS module object with style information
 */
interface CSSModuleObject {
  /** CSS source code */
  css: string;
  
  /** Media query conditions */
  media?: string;
  
  /** Source map for debugging */
  sourceMap?: unknown;
}

/**
 * CSS class name mappings exported by the module
 * Maps CSS class names to their hashed/scoped equivalents
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Default export: CSS class name mappings
 * Returns undefined if no local class names are defined
 */
declare const cssModule: CSSModuleLocals | undefined;

export default cssModule;

/**
 * Re-export all named exports from the original CSS module
 * (excluding the 'default' export)
 */
export * from './style-module';