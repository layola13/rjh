/**
 * CSS Module exports type definition
 * Handles style injection and exports CSS class names as typed properties
 */

/**
 * Configuration object for style loader operations
 */
interface StyleLoaderConfig {
  /** Transform function to apply style tag modifications */
  styleTagTransform: () => void;
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  /** Function to insert style elements into the DOM */
  insert: (target: string) => void;
  /** DOM API utilities for style manipulation */
  domAPI: () => void;
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module with optional locals (class name mappings)
 */
interface CSSModule {
  /** CSS class name mappings exported by the module */
  locals?: Record<string, string>;
  [key: string]: unknown;
}

/**
 * CSS class name mappings exported from the module
 * Maps original class names to hashed/scoped class names
 */
export type CSSModuleClasses = Record<string, string> | undefined;

/**
 * Default export: CSS class name mappings
 * Returns undefined if no locals are present in the CSS module
 */
declare const cssModuleExports: CSSModuleClasses;

export default cssModuleExports;

/**
 * Re-exported named exports from the CSS module
 * Includes all exports except 'default'
 */
export * from './styles.module.css';