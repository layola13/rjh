/**
 * CSS Module Loader Type Definitions
 * 
 * This module represents a CSS-in-JS loader that processes stylesheets
 * and injects them into the DOM at runtime.
 */

/**
 * Configuration options for style injection
 */
interface StyleLoaderOptions {
  /**
   * Function to transform and insert style tags into the DOM
   */
  styleTagTransform: StyleTagTransformFunction;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: SetAttributesFunction;
  
  /**
   * Function to insert style elements into a target container
   */
  insert: InsertFunction;
  
  /**
   * DOM manipulation API
   */
  domAPI: DOMAPIFunction;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Function type for transforming and applying styles
 */
type StyleTagTransformFunction = () => void;

/**
 * Function type for setting attributes on DOM elements
 */
type SetAttributesFunction = () => void;

/**
 * Function type for inserting elements into the DOM
 * @param target - The target container (e.g., "head")
 */
type InsertFunction = (target: string) => void;

/**
 * Function type for DOM API operations
 */
type DOMAPIFunction = () => void;

/**
 * Function type for creating and inserting style elements
 */
type InsertStyleElementFunction = () => void;

/**
 * CSS Module locals/classNames mapping
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * CSS Module export structure
 */
interface CSSModuleExport {
  /**
   * Local class name mappings
   */
  locals?: CSSModuleLocals;
  
  [key: string]: unknown;
}

/**
 * Re-exported CSS module members (excluding 'default')
 */
export * from './source-css-module';

/**
 * Default export: CSS module locals or undefined
 * 
 * Returns the local class name mappings if available,
 * otherwise returns undefined.
 */
declare const cssModuleLocals: CSSModuleLocals | undefined;

export default cssModuleLocals;