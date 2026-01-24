/**
 * CSS Module Loader Type Definitions
 * Webpack CSS loader with style injection functionality
 */

/**
 * CSS Module class names mapping
 * Maps CSS class names to their hashed/scoped equivalents
 */
type CSSModuleClasses = Record<string, string>;

/**
 * Style loader configuration options
 */
interface StyleLoaderOptions {
  /**
   * Transform function for style tags before insertion
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * DOM insertion function bound to target element
   * @param target - Target selector (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM API adapter for style manipulation
   */
  domAPI: () => void;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module with metadata
 */
interface CSSModule {
  /**
   * Exported CSS class names (if CSS modules enabled)
   */
  locals?: CSSModuleClasses;
  
  /**
   * Additional module metadata
   */
  [key: string]: unknown;
}

/**
 * Re-exported types from the original CSS module (excluding 'default')
 */
export * from './original-css-module';

/**
 * Default export: CSS module class names or undefined
 * Returns the locals object containing scoped class names if CSS modules are enabled,
 * otherwise returns undefined for global CSS
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;