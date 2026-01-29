/**
 * CSS Module Declaration
 * 
 * This module exports CSS class names as a typed object for type-safe styling.
 * The module uses style-loader to inject styles into the DOM at runtime.
 */

/**
 * Configuration options for style injection
 */
export interface StyleLoaderOptions {
  /** Transform function to inject style tags into DOM */
  styleTagTransform: () => void;
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  /** Function to insert style elements into specified target */
  insert: (target: string) => void;
  /** DOM manipulation API */
  domAPI: () => void;
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module Locals - Type-safe CSS class name mappings
 * 
 * Contains the class name mappings exported by this CSS module.
 * Each key represents a class name from the source CSS file,
 * mapped to its hashed/scoped class name.
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Default export - CSS module class names
 * 
 * @example
 * import styles from './module';
 * <div className={styles.container} />
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

export default cssModuleLocals;

/**
 * Re-exported utilities from the underlying CSS module loader
 * All exports except 'default' from the source module are re-exported here
 */
export * from './source-css-module';