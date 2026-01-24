/**
 * CSS Module type definitions
 * 
 * This module represents a CSS-in-JS style loader that injects styles
 * into the document and optionally exports CSS module class names.
 */

/**
 * CSS module class name mappings.
 * Keys are the original class names from the CSS file,
 * values are the generated/scoped class names.
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Style injection options for the CSS loader.
 */
export interface StyleLoaderOptions {
  /**
   * Function to transform and insert style tags into the DOM
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Function to insert style elements into a specific DOM location
   * @param target - The DOM selector or element to insert into (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM API utilities for style manipulation
   */
  domAPI: () => void;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS module export.
 * If the stylesheet uses CSS modules, `locals` contains the class name mappings.
 * Otherwise, it's undefined.
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * Re-exported items from the underlying CSS module loader.
 * These may include additional utilities or metadata about the loaded styles.
 */
export * from './css-module-loader';