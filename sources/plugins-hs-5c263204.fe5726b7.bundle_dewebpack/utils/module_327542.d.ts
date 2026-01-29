/**
 * CSS Module type definitions
 * Module: module_327542
 * Original ID: 327542
 */

/**
 * CSS Modules class name mapping interface
 * Maps CSS class names to their scoped equivalents
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
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
   * Function to insert style elements into a specific DOM location
   * @param target - The DOM target (e.g., 'head')
   */
  insert: (target: string) => void;
  
  /**
   * DOM manipulation API interface
   */
  domAPI: () => void;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * Default export: CSS module class name mappings
 * Returns the locally scoped class names or undefined if not available
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

export default cssModuleLocals;