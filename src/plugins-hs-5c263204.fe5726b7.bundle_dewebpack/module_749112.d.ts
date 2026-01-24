/**
 * CSS Module loader type definitions
 * Handles CSS module imports with style injection and local class name mapping
 */

/**
 * CSS Modules class name mapping
 * Maps original class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Style loader configuration options
 */
export interface StyleLoaderOptions {
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
   * @param target - Target DOM location (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM API interface for style manipulation
   */
  domAPI: () => void;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module metadata
 */
export interface CSSModule {
  /**
   * Local class name mappings for CSS modules
   */
  locals?: CSSModuleClasses;
  
  /**
   * Additional module metadata
   */
  [key: string]: unknown;
}

/**
 * Default export: CSS module class name mappings
 * Returns undefined if no local class names are defined
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * Re-exported members from the CSS module
 * All named exports except 'default' are passed through
 */
export * from './css-module-source';