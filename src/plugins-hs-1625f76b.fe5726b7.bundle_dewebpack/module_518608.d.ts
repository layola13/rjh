/**
 * Style loader module configuration and exports
 * Handles CSS module injection and style management
 */

/**
 * Style loader configuration object
 * Contains methods for manipulating and injecting styles into the DOM
 */
interface StyleLoaderConfig {
  /** Transform function to apply to style tags before insertion */
  styleTagTransform: StyleTagTransformFunction;
  
  /** Function to set attributes on style elements */
  setAttributes: SetAttributesFunction;
  
  /** Function to insert style elements into a specific DOM location */
  insert: InsertFunction;
  
  /** API for DOM manipulation operations */
  domAPI: DOMAPIFunction;
  
  /** Function to create and return a style element */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Function that transforms style tag content
 */
type StyleTagTransformFunction = () => void;

/**
 * Function that sets attributes on DOM elements
 */
type SetAttributesFunction = () => void;

/**
 * Function that inserts elements into the DOM at a specified location
 * @param target - The insertion target (e.g., "head")
 */
type InsertFunction = (target: string) => void;

/**
 * DOM API manipulation function
 */
type DOMAPIFunction = () => void;

/**
 * Function that creates and inserts a style element
 */
type InsertStyleElementFunction = () => void;

/**
 * CSS Module locals object containing class name mappings
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style module object that may contain local class name mappings
 */
interface StyleModule {
  /** Optional CSS module class name mappings */
  locals?: CSSModuleLocals;
}

/**
 * Re-exported module members (excluding default export)
 */
export * from './original-module';

/**
 * Default export: CSS module locals or undefined
 * Contains the class name mappings if CSS modules are enabled
 */
declare const cssModuleExport: CSSModuleLocals | undefined;

export default cssModuleExport;