/**
 * CSS Module type definitions
 * Represents a CSS module loader with style injection functionality
 */

/**
 * CSS module class names mapping
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style loader options for injecting CSS into the DOM
 */
export interface StyleLoaderOptions {
  /**
   * Transform function to apply to style tags before insertion
   */
  styleTagTransform: () => void;

  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;

  /**
   * Insert function to add style elements to the DOM
   * Bound to insert into the "head" element
   */
  insert: (element: HTMLElement) => void;

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
 * CSS Module exports
 * Contains the class name mappings and re-exports all named exports from the source module
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;

/**
 * Re-export all named exports from the CSS module source
 * (excluding the default export)
 */
export * from './source-module';