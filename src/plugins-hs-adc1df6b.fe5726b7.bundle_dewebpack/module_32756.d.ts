/**
 * CSS Module type definition
 * Defines the shape of CSS module exports with type-safe class name access
 */

/**
 * CSS module locals interface
 * Contains the mapping of CSS class names to their hashed equivalents
 */
interface CSSModuleLocals {
  readonly [className: string]: string;
}

/**
 * Style loader options interface
 * Configuration for injecting CSS into the DOM
 */
interface StyleLoaderOptions {
  /** Transform function to apply to style tags before insertion */
  styleTagTransform: () => void;
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  /** Function to insert style elements into the DOM */
  insert: (target: string) => void;
  /** DOM API implementation for style manipulation */
  domAPI: () => void;
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module export type
 * Represents the default export of a CSS module
 */
type CSSModuleExport = CSSModuleLocals | undefined;

/**
 * Re-exported types and utilities from the style loader
 */
export * from './style-loader';

/**
 * Default export containing CSS class name mappings
 * Returns undefined if no locals are defined in the CSS module
 */
export default CSSModuleExport;