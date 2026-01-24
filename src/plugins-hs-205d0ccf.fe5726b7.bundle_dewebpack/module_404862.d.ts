/**
 * CSS Module Declaration
 * 
 * This module exports CSS class names that can be imported and used in TypeScript files.
 * The default export provides access to locally scoped CSS class names.
 */

/**
 * CSS module locals containing scoped class names
 */
export interface CSSModuleLocals {
  readonly [className: string]: string;
}

/**
 * Style loader configuration options
 */
export interface StyleLoaderOptions {
  /** Transform function to inject styles into the DOM */
  readonly styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  readonly setAttributes: () => void;
  
  /** Function to insert style elements into the document */
  readonly insert: (target: string) => void;
  
  /** DOM API interface for style manipulation */
  readonly domAPI: () => void;
  
  /** Function to create and insert style elements */
  readonly insertStyleElement: () => void;
}

/**
 * Default export: CSS module class name mappings
 * 
 * @remarks
 * Returns an object where keys are the original class names from the CSS file
 * and values are the transformed/scoped class names to use in the application.
 * 
 * @example
 *