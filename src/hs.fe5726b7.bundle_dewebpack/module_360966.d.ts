/**
 * CSS Module Declaration
 * 
 * This module exports CSS class names as a typed object for type-safe styling.
 * It represents a CSS module that has been processed and can be imported in TypeScript.
 */

/**
 * CSS Modules class name mapping
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Style injection configuration options
 */
export interface StyleInjectionOptions {
  /**
   * Function to transform style tags before insertion
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Function to insert style elements into the DOM
   * @param target - The DOM element to insert into (e.g., 'head')
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
 * CSS Module loader result
 * Contains the processed CSS content and metadata
 */
export interface CSSModuleLoader {
  /**
   * The class name mappings for this CSS module
   * Maps original class names to their scoped versions
   */
  locals?: CSSModuleClasses;
}

/**
 * Default export: CSS module class names
 * Use this to access type-safe CSS class names in your components
 * 
 * @example
 * import styles from './styles.module.css';
 * <div className={styles.container} />
 */
declare const cssModuleClasses: CSSModuleClasses | undefined;

export default cssModuleClasses;

/**
 * Re-exported members from the CSS loader module (592171)
 * These are all named exports from the original CSS module
 */
export * from './css-loader-module';