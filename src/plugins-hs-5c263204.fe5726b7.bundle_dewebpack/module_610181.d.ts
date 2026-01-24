/**
 * CSS Module Type Definitions
 * 
 * This module provides type definitions for a CSS module loader that handles
 * style injection and transformation in a webpack environment.
 */

/**
 * Style loader configuration object
 * Contains methods for DOM manipulation and style tag transformation
 */
interface StyleLoaderConfig {
  /** Transforms and applies styles to style tags */
  styleTagTransform: () => void;
  
  /** Sets attributes on style elements */
  setAttributes: () => void;
  
  /** Inserts style elements into the specified container */
  insert: (container: string) => void;
  
  /** DOM API utilities for style manipulation */
  domAPI: () => void;
  
  /** Creates and inserts style elements into the DOM */
  insertStyleElement: () => void;
}

/**
 * CSS Module Locals
 * Maps CSS class names to their hashed/scoped equivalents
 * 
 * @example
 *