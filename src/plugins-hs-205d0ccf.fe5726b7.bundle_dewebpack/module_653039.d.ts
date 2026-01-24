/**
 * CSS Module Loader Configuration
 * 
 * This module configures style injection for CSS modules in a webpack environment.
 * It sets up various loaders and utilities for handling CSS transformations and DOM injection.
 */

/**
 * Style loader API function type for transforming style tags
 */
type StyleTagTransformFunction = () => void;

/**
 * Function type for setting attributes on DOM elements
 */
type SetAttributesFunction = () => void;

/**
 * Function type for inserting style elements into the DOM
 * @param target - The DOM element or selector where styles should be inserted (e.g., "head")
 */
type InsertFunction = (target: string) => void;

/**
 * Function type for DOM API operations
 */
type DomAPIFunction = () => void;

/**
 * Function type for inserting style elements
 */
type InsertStyleElementFunction = () => void;

/**
 * Configuration object for style loading options
 */
interface StyleLoaderOptions {
  /** Transform function for style tags */
  styleTagTransform: StyleTagTransformFunction;
  
  /** Function to set attributes on style elements */
  setAttributes: SetAttributesFunction;
  
  /** Function to insert styles into a specific DOM location */
  insert: InsertFunction;
  
  /** DOM manipulation API */
  domAPI: DomAPIFunction;
  
  /** Function to create and insert style elements */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * CSS Module locals interface
 * Contains the mapping of CSS class names to their hashed equivalents
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * CSS Module export interface
 */
interface CSSModule {
  /** Local class name mappings for CSS modules */
  locals?: CSSModuleLocals;
}

/**
 * Default export - CSS module locals or undefined
 * 
 * This represents the processed CSS module, returning either:
 * - An object mapping local class names to their hashed/scoped names
 * - undefined if no locals are defined
 */
declare const moduleExport: CSSModuleLocals | undefined;

export default moduleExport;

/**
 * Re-exports all named exports from the underlying CSS module
 * (excluding the default export)
 */
export * from './original-css-module';