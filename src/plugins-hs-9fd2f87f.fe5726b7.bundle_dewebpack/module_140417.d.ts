/**
 * CSS Module loader and style injection utilities.
 * This module handles the import and injection of CSS modules into the DOM.
 */

/**
 * Configuration options for style injection.
 */
interface StyleLoaderOptions {
  /** Transform function to apply to style tags before insertion */
  styleTagTransform: StyleTagTransformFunction;
  /** Function to set attributes on style elements */
  setAttributes: SetAttributesFunction;
  /** Function to insert style elements into the DOM */
  insert: InsertFunction;
  /** DOM manipulation API interface */
  domAPI: DOMApiFunction;
  /** Function to create and return a style element */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Function type for transforming style tags.
 */
type StyleTagTransformFunction = () => (css: string, styleElement: HTMLStyleElement) => void;

/**
 * Function type for setting attributes on style elements.
 */
type SetAttributesFunction = () => (element: HTMLStyleElement, options: Record<string, unknown>) => void;

/**
 * Function type for inserting elements into the DOM.
 * @param target - The selector or element to insert into (e.g., "head", "body")
 * @param element - The element to insert
 */
type InsertFunction = (target: string, element: HTMLElement) => void;

/**
 * Function type for DOM API operations.
 */
type DOMApiFunction = () => (element: HTMLStyleElement, options: StyleLoaderOptions) => void;

/**
 * Function type for creating and inserting style elements.
 */
type InsertStyleElementFunction = () => HTMLStyleElement;

/**
 * CSS Module export structure.
 */
interface CSSModuleExports {
  /** CSS class name mappings from source to generated names */
  locals?: Record<string, string>;
  /** Other potential exports from the CSS module */
  [key: string]: unknown;
}

/**
 * Style loader function type.
 * @param cssModule - The CSS module to load
 * @param options - Configuration options for style injection
 */
type StyleLoaderFunction = (cssModule: CSSModuleExports, options: StyleLoaderOptions) => void;

/**
 * The default export: CSS module locals (class name mappings).
 * Returns the class name mappings if available, otherwise undefined.
 */
declare const cssModuleLocals: Record<string, string> | undefined;

export default cssModuleLocals;

/**
 * Re-exported members from the CSS module (excluding 'default').
 */
export * from './css-module-source';