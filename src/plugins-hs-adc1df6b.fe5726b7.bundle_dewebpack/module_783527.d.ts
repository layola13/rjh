/**
 * CSS Module type definitions
 * Represents a CSS module that exports class names and styles
 */

/**
 * CSS Module Locals
 * Contains the exported class names from the CSS module
 */
interface CSSModuleLocals {
  readonly [className: string]: string;
}

/**
 * CSS Module Style Loader Options
 * Configuration for style injection and DOM manipulation
 */
interface StyleLoaderOptions {
  /** Transform function to modify style tag before insertion */
  styleTagTransform: () => void;
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  /** Function to insert style element into DOM */
  insert: (target: string) => void;
  /** DOM manipulation API */
  domAPI: () => void;
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module Export
 * The default export from a CSS module containing class name mappings
 */
declare const cssModuleExport: CSSModuleLocals | undefined;

export default cssModuleExport;

/**
 * Re-export all named exports from the CSS module
 * Allows importing individual class names directly
 */
export * from './styles';