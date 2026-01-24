/**
 * CSS Module Loader Type Definitions
 * Webpack style-loader + css-loader module pattern
 */

/**
 * CSS Module class name mappings
 * Maps CSS class names to their hashed/scoped equivalents
 */
type CSSModuleClasses = Record<string, string>;

/**
 * Style loader API configuration options
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
   * Bound to insert into 'head' element
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
 * CSS Module export structure
 * Contains both the locals (class name mappings) and style injection logic
 */
interface CSSModuleExport {
  /**
   * CSS class name mappings (optional)
   * Present when CSS modules are enabled
   */
  locals?: CSSModuleClasses;
}

/**
 * Re-exported types and values from the original CSS module
 */
export * from './569020';

/**
 * Default export: CSS module class name mappings
 * Returns undefined if no locals are present
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

export default cssModuleLocals;