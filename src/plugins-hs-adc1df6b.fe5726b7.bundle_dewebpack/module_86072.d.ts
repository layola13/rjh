/**
 * CSS Module exports type definition
 * Represents the exported class names from a CSS/SCSS module
 */

/**
 * CSS Module class names mapping
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Style loader configuration options
 */
interface StyleLoaderOptions {
  /**
   * Transform function applied to style tags before insertion
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Insert function bound to target element (e.g., "head")
   */
  insert: (element: HTMLStyleElement) => void;
  
  /**
   * DOM API implementation for style manipulation
   */
  domAPI: () => void;
  
  /**
   * Function to create and insert style elements into the DOM
   */
  insertStyleElement: () => void;
}

/**
 * Default export: CSS Module locals (class name mappings)
 * Returns undefined if no locals are defined
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

export default cssModuleLocals;

/**
 * Re-exported members from the underlying CSS module
 * All named exports except 'default' from the source module
 */
export * from './source-module';