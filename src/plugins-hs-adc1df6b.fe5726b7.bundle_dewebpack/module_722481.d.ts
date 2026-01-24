/**
 * CSS Module Type Declaration
 * 
 * This module exports CSS class name mappings for type-safe CSS Modules usage.
 * The actual styles are injected at runtime via style-loader.
 */

/**
 * CSS class name mappings exported by this CSS Module.
 * Keys represent the original class names in the CSS file,
 * values are the transformed/hashed class names used at runtime.
 * 
 * @example
 * import styles from './module.css';
 * <div className={styles.container} />
 */
declare const cssModuleLocals: Record<string, string> | undefined;

export default cssModuleLocals;

/**
 * Re-exported members from the underlying CSS loader module.
 * These may include additional metadata or utility functions.
 */
export * from './css-loader-module';

/**
 * Style injection configuration used by style-loader.
 * @internal - Not typically used by application code
 */
export interface StyleLoaderConfig {
  /** Transform function for style tag manipulation */
  styleTagTransform: () => void;
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  /** DOM insertion function bound to 'head' element */
  insert: (element: HTMLElement) => void;
  /** DOM manipulation API */
  domAPI: () => void;
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}