/**
 * CSS Module Definition
 * 
 * This module exports CSS class names as a typed object.
 * It represents a CSS module that has been processed by webpack's css-loader
 * and can be used with style-loader for runtime style injection.
 */

/**
 * CSS class names exported by this module.
 * Each property represents a CSS class that can be applied to elements.
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style loader API for managing CSS injection
 */
export interface StyleLoaderAPI {
  /** Transform and inject style tag into the document */
  styleTagTransform: () => void;
  /** Set attributes on the style element */
  setAttributes: () => void;
  /** Insert style element into the document */
  insert: (target: string) => void;
  /** DOM manipulation API */
  domAPI: () => void;
  /** Create and insert style element */
  insertStyleElement: () => void;
}

/**
 * CSS Module exports.
 * Contains the locally scoped class names from the CSS file.
 * 
 * @default undefined if no locals are defined
 * @example
 * import styles from './styles.module.css';
 * <div className={styles.container} />
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;

/**
 * Re-exported members from the underlying CSS loader module.
 * Excludes the 'default' export to prevent conflicts.
 */
export * from 'css-loader';