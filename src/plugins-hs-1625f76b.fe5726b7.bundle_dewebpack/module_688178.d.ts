/**
 * CSS Modules type definitions
 * 
 * This module handles CSS-in-JS runtime injection and exports typed CSS class names.
 * It configures style loaders and provides type-safe access to CSS module classes.
 */

/**
 * CSS class names mapping from CSS Modules
 * Maps selector names to their generated/hashed class names
 */
export type CSSModuleClasses = Record<string, string> | undefined;

/**
 * Style injection configuration options
 */
export interface StyleLoaderOptions {
  /** Transforms style tag before insertion */
  styleTagTransform: () => void;
  /** Sets attributes on style elements */
  setAttributes: () => void;
  /** Inserts style element into DOM at specified position */
  insert: (position: string) => void;
  /** DOM manipulation API */
  domAPI: () => void;
  /** Creates and inserts style element */
  insertStyleElement: () => void;
}

/**
 * CSS Modules exports - re-exported from the original CSS module
 * Excludes 'default' export to only expose named class exports
 */
export * from './original-css-module';

/**
 * Default export containing CSS class name mappings
 * Returns the locals object from the CSS module if available, otherwise undefined
 */
declare const cssModuleClasses: CSSModuleClasses;
export default cssModuleClasses;