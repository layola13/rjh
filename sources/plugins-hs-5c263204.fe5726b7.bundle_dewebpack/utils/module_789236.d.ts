/**
 * CSS Module type definitions
 * @module CSSModuleLoader
 */

/**
 * Style loader configuration options
 */
interface StyleLoaderOptions {
  /** Transform function for style tags */
  styleTagTransform: () => void;
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  /** Function to insert style elements into DOM */
  insert: (target: string) => void;
  /** DOM API utilities */
  domAPI: () => void;
  /** Function to insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module exports interface
 */
interface CSSModuleExports {
  /** CSS class name mappings */
  locals?: Record<string, string>;
  [key: string]: unknown;
}

/**
 * Default export - CSS Module class names
 * Returns an object mapping CSS class names to their hashed equivalents,
 * or undefined if no locals are available
 */
declare const cssModuleLocals: Record<string, string> | undefined;

export default cssModuleLocals;

/**
 * Re-exported members from the CSS module
 * All named exports from the original module are re-exported here
 */
export * from './original-css-module';