/**
 * CSS Module exports interface
 * Represents the structure of CSS class names exported from a CSS Module
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style loader configuration options
 * Configuration object for injecting and managing CSS styles in the DOM
 */
interface StyleLoaderOptions {
  /**
   * Transform function to apply to style tags before insertion
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Function to insert style elements into the DOM
   * @param target - The DOM node where styles will be inserted (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM API interface for style manipulation
   */
  domAPI: () => void;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module with optional class name mappings
 * Represents a loaded CSS module that may contain local class name mappings
 */
interface CSSModule {
  /**
   * Local class name mappings from the CSS Module
   * Maps original class names to their scoped/hashed versions
   */
  locals?: CSSModuleLocals;
}

/**
 * Default export: CSS Module class name mappings
 * Returns the local class names from the CSS Module, or undefined if none exist
 */
declare const cssModuleExports: CSSModuleLocals | undefined;

export default cssModuleExports;

/**
 * Re-exports all named exports from the underlying CSS Module
 * Allows direct import of any additional exports from the CSS file
 */
export * from './css-module-source';