/**
 * CSS Module type definitions
 * 
 * This module handles CSS-in-JS loading with webpack style-loader.
 * Exports CSS class names as a typed object for use in TypeScript components.
 */

/**
 * CSS module class names mapping
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style loader options configuration
 */
export interface StyleLoaderOptions {
  /** Transform function to inject style tags into DOM */
  styleTagTransform: () => void;
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  /** Insert function to add styles to specified DOM location */
  insert: (target: string) => void;
  /** DOM API helper functions */
  domAPI: () => void;
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS module with locals (class names)
 */
export interface CSSModule {
  /** Local class name mappings */
  locals?: CSSModuleClasses;
  /** Additional CSS module properties */
  [key: string]: unknown;
}

/**
 * Default export: CSS module class names
 * Returns undefined if no local class names are defined
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * Re-exported items from the CSS module loader
 * All named exports from the underlying CSS module are available
 */
export * from './css-module-loader';