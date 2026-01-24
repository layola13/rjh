/**
 * CSS Module type definitions
 * Module: module_862999
 * Original ID: 862999
 * 
 * This module exports type definitions for a CSS Modules stylesheet.
 * It handles style injection and exports CSS class name mappings.
 */

/**
 * CSS Module class name mappings
 * Maps the original CSS class names to their scoped/hashed equivalents
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Style loader configuration options
 */
interface StyleLoaderOptions {
  /** Transform function to manipulate style tags */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** Function to insert style elements into the DOM */
  insert: (target: string) => void;
  
  /** DOM API helper functions */
  domAPI: () => void;
  
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module exports
 * Contains the locally scoped class names from the stylesheet
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;

/**
 * Re-exported members from the style loader module
 * All named exports except 'default' are forwarded
 */
export * from 'style-loader';