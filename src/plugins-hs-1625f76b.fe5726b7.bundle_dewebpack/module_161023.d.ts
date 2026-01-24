/**
 * CSS Module type definitions
 * 
 * This module represents a CSS Modules file that exports:
 * - A default export containing CSS class name mappings
 * - Named exports for individual CSS classes
 * 
 * The module uses style-loader infrastructure to inject styles into the DOM
 * and provides typed access to CSS class names.
 */

/**
 * CSS class name mapping object.
 * Keys are the original class names from the CSS file,
 * values are the generated/hashed class names.
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Default export: CSS class name mappings.
 * 
 * Use this to access CSS classes in a type-safe manner:
 * @example
 * import styles from './styles.module.css';
 * <div className={styles.myClass} />
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;

/**
 * Named exports: Individual CSS class names.
 * Each class from the CSS module is also exported individually.
 * 
 * @example
 * import { myClass } from './styles.module.css';
 * <div className={myClass} />
 */
export const [key: string]: string | undefined;