/**
 * CSS Module exports
 * Provides typed class name mappings for stylesheet
 */

/**
 * CSS class name mapping object
 * Maps semantic class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Style injection configuration
 * Controls how styles are inserted and managed in the DOM
 */
export interface StyleLoaderOptions {
  /** Transform function applied to style tags before insertion */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** DOM insertion strategy (typically targets <head>) */
  insert: (target: string) => void;
  
  /** DOM API interface for style manipulation */
  domAPI: () => void;
  
  /** Factory function for creating style elements */
  insertStyleElement: () => void;
}

/**
 * CSS module locals (exported class names)
 * Returns undefined if no local classes are exported
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

/**
 * Default export: CSS module class name mappings
 * Use these to apply scoped styles to your components
 * 
 * @example
 * import styles from './styles.module.css';
 * <div className={styles.container} />
 */
export default cssModuleLocals;

/**
 * Re-exported utilities from the underlying CSS loader
 * (Exact shape depends on the loaded module 610918)
 */
export * from './css-loader-module';