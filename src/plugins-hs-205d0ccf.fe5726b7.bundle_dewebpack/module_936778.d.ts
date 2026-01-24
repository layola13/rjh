/**
 * CSS Module exports interface
 * Defines the shape of CSS class name mappings exported from a CSS Module
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style loader configuration options
 * Configuration object for webpack style-loader injection behavior
 */
interface StyleLoaderOptions {
  /**
   * Function to transform and inject style tags into the DOM
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Function to insert style elements into a specific DOM location
   * @param target - The DOM selector where styles should be inserted (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM manipulation API for style injection
   */
  domAPI: () => void;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module with optional class name mappings
 * Represents a loaded CSS module that may export local class names
 */
interface CSSModule {
  locals?: CSSModuleLocals;
}

/**
 * Re-exported CSS module class names
 * All named exports from the original CSS module (excluding 'default')
 */
export * from './original-css-module';

/**
 * Default export: CSS Module class name mappings
 * Returns the local class names object if available, otherwise undefined
 */
declare const cssModuleExports: CSSModuleLocals | undefined;

export default cssModuleExports;