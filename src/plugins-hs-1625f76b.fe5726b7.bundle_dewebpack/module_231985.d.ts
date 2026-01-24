/**
 * CSS Module loader and style injection types
 * 
 * This module handles dynamic CSS injection into the DOM and exports
 * CSS Modules class name mappings.
 */

/**
 * Style loader configuration interface
 * Defines methods for injecting and managing styles in the DOM
 */
interface StyleLoaderOptions {
  /** Transform function to create and inject style tags */
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
 * Function type for transforming and injecting CSS into style tags
 */
type StyleTagTransformFunction = () => void;

/**
 * Function type for setting attributes on DOM elements
 */
type SetAttributesFunction = () => void;

/**
 * Function type for inserting elements into specific DOM locations
 * @param target - Target location in DOM (e.g., 'head', 'body')
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
 * CSS Modules class name mapping
 * Maps CSS class names to their hashed/scoped equivalents
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style module export structure
 * Contains the CSS content and optional locals (class name mappings)
 */
interface StyleModule {
  /** Hashed class name mappings for CSS Modules */
  locals?: CSSModuleLocals;
  
  /** Additional style module properties */
  [key: string]: unknown;
}

/**
 * Re-exported style module members (excluding 'default')
 */
export * from './style-module';

/**
 * Default export: CSS Modules class name mappings
 * Returns the locals object if available, otherwise undefined
 */
declare const cssModuleLocals: CSSModuleLocals | undefined;

export default cssModuleLocals;