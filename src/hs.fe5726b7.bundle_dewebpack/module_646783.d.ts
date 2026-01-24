/**
 * CSS Module Declaration
 * 
 * This module injects styles into the DOM and optionally exports CSS module class names.
 * Generated from webpack style-loader processing.
 */

/**
 * CSS module class name mappings.
 * Each key represents a class name from the source CSS, mapped to its transformed name.
 */
export type CSSModuleClasses = Record<string, string>;

/**
 * Style loader configuration options for DOM manipulation.
 */
export interface StyleLoaderOptions {
  /** Transforms and applies the CSS content to the DOM */
  styleTagTransform: () => void;
  
  /** Sets attributes on the generated style elements */
  setAttributes: () => void;
  
  /** Inserts the style element into the specified DOM location */
  insert: (target: string) => void;
  
  /** DOM manipulation API implementation */
  domAPI: () => void;
  
  /** Creates and returns the style element */
  insertStyleElement: () => void;
}

/**
 * Default export: CSS module locals (class name mappings).
 * Returns undefined if CSS modules are not enabled for this file.
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

export default cssModuleLocals;

/**
 * Re-exported members from the underlying CSS module (module 197064).
 * All named exports except 'default' are forwarded.
 */
export * from './underlying-css-module';