/**
 * CSS Module Exports
 * 
 * This module handles CSS-in-JS style injection and exports the corresponding CSS class names.
 * It uses a chain of loaders to process and inject styles into the DOM.
 */

/**
 * Configuration options for style injection
 */
interface StyleLoaderOptions {
  /** Transform function to modify the style tag before insertion */
  styleTagTransform: () => void;
  /** Function to set attributes on the style element */
  setAttributes: () => void;
  /** Function to insert the style element into the DOM */
  insert: (target: string) => void;
  /** DOM API utilities for style manipulation */
  domAPI: () => void;
  /** Function to create and insert the style element */
  insertStyleElement: () => void;
}

/**
 * CSS Module class name mappings
 * Maps semantic class names to their hashed/scoped equivalents
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style module with metadata and class mappings
 */
interface StyleModule {
  /** CSS Module class name mappings */
  locals?: CSSModuleLocals;
  [key: string]: unknown;
}

/**
 * Re-exported members from the style module (excluding 'default')
 */
export * from './styleModule';

/**
 * Default export: CSS Module class name mappings
 * Returns the locals object containing class name mappings, or undefined if not available
 */
declare const cssModuleExports: CSSModuleLocals | undefined;
export default cssModuleExports;