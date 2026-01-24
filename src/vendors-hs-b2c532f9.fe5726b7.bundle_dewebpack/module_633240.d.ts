/**
 * CSS Module Loader
 * Handles CSS injection and style management for webpack bundles
 */

/**
 * Configuration options for style tag transformation
 */
interface StyleLoaderOptions {
  /** Function to transform and inject style tags */
  styleTagTransform: StyleTagTransformFunction;
  /** Function to set attributes on style elements */
  setAttributes: SetAttributesFunction;
  /** Function to insert style elements into DOM */
  insert: InsertFunction;
  /** DOM manipulation API interface */
  domAPI: DomAPIInterface;
  /** Function to create and insert style elements */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Transforms and injects style content into the DOM
 */
type StyleTagTransformFunction = () => void;

/**
 * Sets custom attributes on style elements
 */
type SetAttributesFunction = () => void;

/**
 * Inserts a style element at a specific location in the DOM
 * @param target - The DOM insertion point (e.g., 'head', 'body')
 */
type InsertFunction = (target: string) => void;

/**
 * Interface for DOM manipulation operations
 */
interface DomAPIInterface {
  /** Methods for DOM manipulation */
  [key: string]: unknown;
}

/**
 * Creates and inserts a style element into the document
 */
type InsertStyleElementFunction = () => void;

/**
 * CSS Module locals (class name mappings)
 * Maps original class names to their hashed/scoped equivalents
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * CSS Module export structure
 */
interface CSSModuleExport {
  /** Local class name mappings if CSS Modules are enabled */
  locals?: CSSModuleLocals;
  /** Raw CSS content */
  [key: string]: unknown;
}

/**
 * Default export: CSS Module locals or undefined
 * Returns the local class name mappings if CSS Modules are enabled,
 * otherwise returns undefined for global stylesheets
 */
declare const _default: CSSModuleLocals | undefined;

export default _default;

/**
 * Re-exported style loader utilities
 * These are available as named exports from the original CSS file
 */
export * from './style-loader';