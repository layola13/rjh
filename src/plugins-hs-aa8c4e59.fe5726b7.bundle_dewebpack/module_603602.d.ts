/**
 * CSS Module Loader Type Definitions
 * 
 * This module handles CSS-in-JS loading with hot module replacement support.
 * Exports CSS class name mappings and style injection utilities.
 */

/**
 * Configuration options for style injection
 */
interface StyleLoaderOptions {
  /** Transform function for style tag manipulation */
  styleTagTransform: StyleTagTransformFunction;
  
  /** Function to set attributes on style elements */
  setAttributes: SetAttributesFunction;
  
  /** DOM insertion function */
  insert: InsertFunction;
  
  /** DOM manipulation API */
  domAPI: DOMAPIFunction;
  
  /** Function to create and insert style elements */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Function type for transforming style tags
 */
type StyleTagTransformFunction = () => void;

/**
 * Function type for setting attributes on DOM elements
 */
type SetAttributesFunction = () => void;

/**
 * Function type for inserting elements into DOM
 * @param target - Target selector or element (e.g., "head")
 */
type InsertFunction = (target: string) => void;

/**
 * Function type for DOM API operations
 */
type DOMAPIFunction = () => void;

/**
 * Function type for inserting style elements
 */
type InsertStyleElementFunction = () => void;

/**
 * CSS Module class name mappings
 * Maps local class names to globally unique hashed class names
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style loader module interface
 */
interface StyleLoaderModule {
  /** Local CSS class name mappings */
  locals?: CSSModuleLocals;
}

/**
 * Re-exported utilities from the style loader dependency
 */
export * from './style-loader-utils';

/**
 * Default export: CSS class name mappings
 * Returns the local class names object or undefined if not available
 */
declare const cssModuleExports: CSSModuleLocals | undefined;

export default cssModuleExports;