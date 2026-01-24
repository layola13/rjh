/**
 * CSS Module Type Definitions
 * Module ID: 900120
 * 
 * This module handles CSS module imports and provides type-safe access to CSS class names.
 * It configures style injection into the document head using a set of style loaders.
 */

/**
 * Configuration options for style loader
 */
interface StyleLoaderOptions {
  /** Transform function to apply to style tags before insertion */
  styleTagTransform: StyleTagTransformFunction;
  
  /** Function to set attributes on style elements */
  setAttributes: SetAttributesFunction;
  
  /** Function to insert style elements into the DOM */
  insert: InsertFunction;
  
  /** DOM API utilities for style manipulation */
  domAPI: DomAPIFunction;
  
  /** Function to create and insert style elements */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * CSS Module locals - maps CSS class names to their hashed equivalents
 */
type CSSModuleLocals = Record<string, string> | undefined;

/**
 * Function that transforms style tags before DOM insertion
 */
type StyleTagTransformFunction = () => void;

/**
 * Function to set attributes on style elements
 */
type SetAttributesFunction = () => void;

/**
 * Function to insert elements at a specific position in the DOM
 * @param position - DOM position identifier (e.g., "head")
 */
type InsertFunction = (position: string) => void;

/**
 * DOM manipulation API for styles
 */
type DomAPIFunction = () => void;

/**
 * Function to create and insert style elements into the document
 */
type InsertStyleElementFunction = () => void;

/**
 * CSS module content structure
 */
interface CSSModule {
  /** Local class name mappings */
  locals?: CSSModuleLocals;
  
  /** Additional module properties */
  [key: string]: unknown;
}

/**
 * Default export: CSS module locals (class name mappings)
 * Returns the local class names if available, otherwise undefined
 */
declare const cssModuleLocals: CSSModuleLocals;

export default cssModuleLocals;

/**
 * Re-exported members from the CSS module
 * All named exports from the original module are re-exported here
 */
export * from './css-module-source';