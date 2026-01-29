/**
 * CSS Module loader type definitions
 * Represents a webpack-generated CSS module with style injection capabilities
 */

/**
 * CSS module class names mapping
 * Maps CSS class names to their hashed/scoped equivalents
 */
type CSSModuleClasses = Record<string, string>;

/**
 * Style loader options for injecting styles into the DOM
 */
interface StyleLoaderOptions {
  /** Transform function to create and insert style tags */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** DOM insertion function (bound to target element) */
  insert: (element: HTMLElement) => void;
  
  /** DOM manipulation API */
  domAPI: () => void;
  
  /** Function to create style elements */
  insertStyleElement: (element: HTMLElement) => void;
}

/**
 * CSS Module export
 * Contains the hashed class names for use in components
 */
interface CSSModule {
  /** Mapping of original class names to scoped class names */
  locals?: CSSModuleClasses;
}

/**
 * Default export: CSS module class names
 * Use this to access scoped CSS class names in your components
 * 
 * @example
 * import styles from './styles.module.css';
 * <div className={styles.container} />
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * Re-exported members from the CSS module
 * Allows named imports of specific classes or utilities
 */
export * from './css-module-source';