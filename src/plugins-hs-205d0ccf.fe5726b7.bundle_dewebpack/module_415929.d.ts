/**
 * CSS Module type definitions
 * Handles style injection and exports CSS module class names
 */

/**
 * CSS Module class names mapping
 * Maps CSS class names to their hashed/scoped equivalents
 */
interface CSSModuleClasses {
  readonly [key: string]: string;
}

/**
 * Style loader configuration options
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
   * Function to insert style elements into a specified DOM location
   * @param target - The DOM node where styles should be inserted (e.g., "head")
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
 * CSS Module content interface
 */
interface CSSModuleContent {
  /**
   * Local class name mappings for this CSS module
   */
  locals?: CSSModuleClasses;
}

/**
 * Export all named exports from the CSS module
 * (excluding 'default' export)
 */
export * from './original-css-module';

/**
 * Default export: the local class names object
 * Returns undefined if no locals are defined
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;
export default cssModuleLocals;