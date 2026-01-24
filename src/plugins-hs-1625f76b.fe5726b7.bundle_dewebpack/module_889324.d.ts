/**
 * CSS Module Loader Type Definitions
 * 
 * This module handles CSS-in-JS style injection and provides typed exports
 * for CSS module class names.
 */

/**
 * Configuration options for style injection
 */
interface StyleLoaderOptions {
  /** Transform function to apply to style tags before insertion */
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
 * Function type for transforming style tag content
 */
type StyleTagTransformFunction = () => (css: string, styleElement: HTMLStyleElement) => void;

/**
 * Function type for setting attributes on style elements
 */
type SetAttributesFunction = () => (element: HTMLStyleElement, options: Record<string, unknown>) => void;

/**
 * Function type for inserting elements into the DOM
 * @param target - CSS selector or DOM element where styles should be inserted
 */
type InsertFunction = (target: string | HTMLElement, element: HTMLStyleElement) => void;

/**
 * Function type for DOM API operations
 */
type DOMAPIFunction = () => {
  update: (element: HTMLStyleElement) => void;
  remove: (element: HTMLStyleElement) => void;
};

/**
 * Function type for creating style elements
 */
type InsertStyleElementFunction = () => HTMLStyleElement;

/**
 * CSS Module locals object containing class name mappings
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * CSS Module export structure
 */
interface CSSModuleExport {
  /** CSS module class name mappings */
  locals?: CSSModuleLocals;
  
  /** Additional module metadata */
  [key: string]: unknown;
}

/**
 * Default export: CSS module class names
 * Returns the locals object containing CSS class name mappings,
 * or undefined if no locals are present.
 */
declare const cssModuleClassNames: CSSModuleLocals | undefined;

export default cssModuleClassNames;

/**
 * Re-exported members from the CSS module
 * All named exports except 'default' from the original module
 */
export * from './css-module-source';