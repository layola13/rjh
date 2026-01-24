/**
 * CSS Module Type Definitions
 * 
 * This module provides type definitions for a CSS modules file.
 * It exports CSS class names as a typed object for type-safe styling.
 */

/**
 * Style injection configuration options
 */
interface StyleLoaderOptions {
  /** Transform function for style tag manipulation */
  styleTagTransform: () => void;
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  /** DOM insertion function for injecting styles */
  insert: (target: string) => void;
  /** DOM API interface for style manipulation */
  domAPI: () => void;
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Modules class name mapping
 * 
 * Maps CSS class names to their hashed/scoped equivalents.
 * Each property represents a class name defined in the source CSS file.
 */
interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Default export containing the CSS module class mappings
 * 
 * @example
 * import styles from './styles.module.css';
 * <div className={styles.container}>Content</div>
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

export default cssModuleLocals;

/**
 * Re-exported utilities from the style loader
 * (Specific exports depend on the actual g/976908 module)
 */
export * from './style-loader-utilities';