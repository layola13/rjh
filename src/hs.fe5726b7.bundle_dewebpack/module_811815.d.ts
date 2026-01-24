/**
 * CSS Module exports for module_811815
 * This module handles style injection and exports CSS class names as a typed object.
 */

/**
 * Configuration object for style loading
 */
interface StyleLoaderConfig {
  /** Transform function to apply styles to DOM */
  styleTagTransform: () => void;
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  /** Function to insert style elements into DOM */
  insert: (target: string) => void;
  /** DOM API utilities for style manipulation */
  domAPI: () => void;
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module locals - maps CSS class names to generated/hashed names
 * Represents the exported class names from the CSS module
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Default export - CSS module class name mappings
 * Returns undefined if no local class names are defined
 */
declare const cssModuleExports: CSSModuleLocals | undefined;

export default cssModuleExports;

/**
 * Re-exported members from the underlying CSS loader module (excluding 'default')
 * These may include additional CSS module metadata or utility functions
 */
export * from './css-loader-module';