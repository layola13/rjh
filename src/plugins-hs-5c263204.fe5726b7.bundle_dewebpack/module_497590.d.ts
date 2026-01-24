/**
 * CSS Module type definitions
 * Represents a webpack CSS module loader configuration and its exports
 */

/**
 * CSS Module class names mapping
 * Maps local class names to their hashed/scoped equivalents
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style loader insertion options
 * Configuration for how CSS is injected into the DOM
 */
interface StyleLoaderOptions {
  /** Transforms style tags before insertion */
  styleTagTransform: () => void;
  /** Sets attributes on style elements */
  setAttributes: () => void;
  /** Inserts style elements into a target container */
  insert: (target: string) => void;
  /** DOM manipulation API */
  domAPI: () => void;
  /** Creates and inserts style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module export
 * Contains the local class name mappings if CSS Modules are enabled
 */
declare const cssModuleExport: CSSModuleLocals | undefined;

export default cssModuleExport;

/**
 * Re-exports all named exports from the CSS module
 * (e.g., individual class names if exported separately)
 */
export * from './css-module';