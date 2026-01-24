/**
 * CSS module type definitions
 * Represents exported CSS class names from a CSS module
 */

/**
 * CSS module locals object containing class name mappings
 */
export interface CSSModuleLocals {
  readonly [className: string]: string;
}

/**
 * Style loader configuration options
 */
export interface StyleLoaderOptions {
  /**
   * Transform function to apply to style tags
   */
  styleTagTransform?: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes?: () => void;
  
  /**
   * Function to insert style elements into the DOM
   * Bound to insert at "head" position
   */
  insert?: (position: string) => void;
  
  /**
   * DOM API implementation for style manipulation
   */
  domAPI?: () => void;
  
  /**
   * Function to insert style elements
   */
  insertStyleElement?: () => void;
}

/**
 * CSS module exports
 * Contains the class name mappings from the imported CSS module
 * Returns undefined if no locals are defined
 */
declare const cssModuleLocals: CSSModuleLocals | undefined;

export default cssModuleLocals;

/**
 * Re-exported members from the underlying CSS module
 * All named exports except 'default' are preserved
 */
export * from './original-css-module';