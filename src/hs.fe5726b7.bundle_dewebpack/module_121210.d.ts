/**
 * CSS Module Loader Configuration
 * This module configures and applies CSS styles using style-loader utilities
 */

/**
 * Style injection configuration options
 */
interface StyleLoaderOptions {
  /** Transform function to apply style tags to the DOM */
  styleTagTransform: () => void;
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  /** DOM insertion strategy bound to target element */
  insert: () => void;
  /** DOM manipulation API */
  domAPI: () => void;
  /** Style element insertion helper */
  insertStyleElement: () => void;
}

/**
 * CSS Module exports
 * Contains all exported CSS class names and their scoped identifiers
 */
type CSSModuleLocals = Record<string, string> | undefined;

/**
 * Re-exports all named exports from the CSS module (excluding 'default')
 */
export * from './module_775987';

/**
 * Default export containing the CSS module's local class name mappings
 * Returns undefined if no locals are defined
 */
declare const _default: CSSModuleLocals;
export default _default;