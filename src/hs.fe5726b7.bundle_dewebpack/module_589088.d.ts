/**
 * CSS Module loader type definitions
 * Provides type-safe access to CSS modules with dynamic class name bindings
 */

/**
 * CSS class name mapping exported by the module
 * Maps original class names to their hashed/scoped equivalents
 */
type CSSModuleClasses = Record<string, string>;

/**
 * Style loader configuration options
 */
interface StyleLoaderOptions {
  /**
   * Transform function to apply styles to the DOM
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Function to insert style elements into the DOM
   * @param target - DOM selector where styles should be inserted (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM API adapter for style manipulation
   */
  domAPI: () => void;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module export structure
 */
interface CSSModuleExport {
  /**
   * Local class name mappings (original name -> scoped name)
   */
  locals?: CSSModuleClasses;
  
  /**
   * Re-exported module members (excluding 'default')
   */
  [key: string]: unknown;
}

/**
 * Default export: CSS class name mappings
 * Returns undefined if no local class names are defined
 */
declare const cssModuleClasses: CSSModuleClasses | undefined;

export default cssModuleClasses;

/**
 * Re-export all named exports from the original CSS module
 * (excluding the default export)
 */
export * from './original-css-module';