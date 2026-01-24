/**
 * CSS Module exports type definition
 * Represents a dynamically loaded CSS module with optional class name mappings
 */

/**
 * CSS module class names mapping
 * Contains the locally scoped class names exported by the CSS module
 */
export interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style loader configuration options
 * Defines how styles are injected and managed in the DOM
 */
export interface StyleLoaderOptions {
  /**
   * Transform function to apply to style tags before insertion
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set attributes on injected style elements
   */
  setAttributes: () => void;
  
  /**
   * DOM insertion strategy - specifies where to inject style elements
   * @param target - Target DOM location (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM API interface for style manipulation
   */
  domAPI: () => void;
  
  /**
   * Function to create and insert style elements into the DOM
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module exports
 * Re-exports all named exports from the original CSS module
 */
export * from './styles.module.css';

/**
 * Default export containing CSS module class name mappings
 * Returns undefined if no local class names are defined
 */
declare const cssModuleLocals: CSSModuleLocals | undefined;

export default cssModuleLocals;