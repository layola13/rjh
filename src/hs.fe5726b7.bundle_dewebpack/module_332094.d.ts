/**
 * CSS Module type definitions
 * Handles style loading and exports CSS class mappings
 */

/**
 * CSS class name mappings exported by the module
 * Maps semantic class names to their generated/hashed equivalents
 */
interface CSSModuleClasses {
  readonly [key: string]: string;
}

/**
 * Style loader configuration options
 */
interface StyleLoaderOptions {
  /**
   * Function to transform and inject style tags into the DOM
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Function to insert style elements into a specified DOM location
   * @param target - DOM selector where styles should be inserted (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM manipulation API for style injection
   */
  domAPI: () => void;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS module exports with optional class mappings
 */
interface CSSModuleExports {
  /**
   * Local class name mappings (present when CSS Modules are enabled)
   */
  locals?: CSSModuleClasses;
}

/**
 * Default export: CSS class name mappings
 * Returns undefined if no local classes are defined
 */
declare const cssModuleClasses: CSSModuleClasses | undefined;

export default cssModuleClasses;

/**
 * Re-exports all named exports from the source CSS module
 * (excluding the 'default' export)
 */
export * from './source-css-module';