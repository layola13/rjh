/**
 * CSS Module type definitions
 * Represents a dynamically loaded CSS module with style injection capabilities
 */

/**
 * CSS module class names mapping
 * Maps CSS class names to their hashed/scoped equivalents
 */
type CSSModuleClasses = Record<string, string>;

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
   * Function to insert style elements into a specific DOM location
   * @param target - The DOM target selector (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM API implementation for style manipulation
   */
  domAPI: () => void;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS module with metadata
 */
interface CSSModule {
  /**
   * Local class name mappings for the CSS module
   */
  locals?: CSSModuleClasses;
  
  [key: string]: unknown;
}

/**
 * Default export: CSS module class names
 * Contains the scoped class names from the imported CSS module
 * Returns undefined if no local class names are defined
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * Re-exported members from the CSS module
 * All named exports from the original module (excluding 'default')
 */
export * from './css-module-source';