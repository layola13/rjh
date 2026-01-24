/**
 * CSS Module type definition
 * This module represents a stylesheet that can be imported and used in TypeScript/JavaScript.
 * It exports class names that can be referenced in code, with the actual styles injected at runtime.
 */

/**
 * CSS Module locals interface
 * Contains the class names exported by the CSS module
 */
export interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style loader configuration options
 */
export interface StyleLoaderOptions {
  /** Transform function to apply styles to DOM */
  styleTagTransform: () => void;
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  /** Function to insert style elements into DOM */
  insert: (target: string) => void;
  /** DOM manipulation API */
  domAPI: () => void;
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * Default export: CSS module class name mappings
 * Returns an object mapping CSS class names to their hashed/scoped equivalents,
 * or undefined if no locals are available
 */
declare const cssModuleExport: CSSModuleLocals | undefined;

export default cssModuleExport;

/**
 * Re-exported members from the original CSS module
 * Includes all named exports except 'default'
 */
export * from './original-css-module';