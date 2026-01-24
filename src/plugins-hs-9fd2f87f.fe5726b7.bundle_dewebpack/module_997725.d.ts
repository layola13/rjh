/**
 * CSS Module Loader Type Definitions
 * 
 * This module handles CSS module loading and style injection for Webpack.
 * It exports CSS class name mappings and re-exports all named exports from the style module.
 */

/**
 * Style loader options configuration
 */
interface StyleLoaderOptions {
  /** Transform function to apply to style tags */
  styleTagTransform: () => void;
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  /** Function to insert style elements into the DOM */
  insert: (target: string) => void;
  /** DOM API utility functions */
  domAPI: () => void;
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module exports structure
 */
interface CSSModuleExports {
  /** CSS class name mappings (if using CSS modules) */
  locals?: Record<string, string>;
  /** Default export placeholder */
  default?: unknown;
  /** Additional named exports from the CSS module */
  [key: string]: unknown;
}

/**
 * Default export: CSS module class name mappings
 * Returns an object mapping CSS class names to their hashed equivalents,
 * or undefined if CSS modules are not enabled.
 */
declare const cssModuleLocals: Record<string, string> | undefined;

export default cssModuleLocals;

/**
 * Re-exported named exports from the underlying CSS module
 * All exports except 'default' are re-exported from the source module
 */
export * from './style-module';

/**
 * Style loader initialization
 * Note: The actual style injection is performed at module load time
 */
declare const styleLoaderOptions: StyleLoaderOptions;

/**
 * Apply styles to the document
 * @internal
 */
declare function applyStyles(
  cssModule: CSSModuleExports,
  options: StyleLoaderOptions
): void;