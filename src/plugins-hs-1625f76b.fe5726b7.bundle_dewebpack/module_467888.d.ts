/**
 * CSS Module exports type definition
 * Represents the type-safe interface for CSS class names exported from a CSS/SCSS module
 */

/**
 * CSS Module class names mapping interface
 * Maps CSS class names to their generated identifiers
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style loader configuration options
 */
interface StyleLoaderOptions {
  /** Transform function to apply styles to DOM */
  styleTagTransform: () => void;
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  /** DOM insertion function */
  insert: (target: string) => void;
  /** DOM API implementation */
  domAPI: () => void;
  /** Function to insert style elements into DOM */
  insertStyleElement: () => void;
}

/**
 * CSS Module exports
 * Contains the generated CSS class name mappings from the module
 * Returns undefined if no locals are defined
 */
declare const cssModuleExports: CSSModuleLocals | undefined;

export default cssModuleExports;

/**
 * Re-export all named exports from the CSS module
 * Allows direct import of individual class names
 */
export * from './module';