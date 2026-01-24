/**
 * CSS Module Type Definitions
 * 
 * This module exports CSS class names as a typed object,
 * enabling type-safe access to CSS modules in TypeScript.
 */

/**
 * CSS module class names mapping
 * Keys are the class names defined in the source CSS file
 * Values are the transformed/hashed class names used at runtime
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Default export containing all CSS class names from the module
 * Returns undefined if no classes are defined
 * 
 * @example
 * import styles from './styles.module.css';
 * const className = styles.button; // Type-safe access
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * Named exports - all class names are also available as named exports
 * This allows for destructured imports of specific classes
 * 
 * @example
 * import { button, container } from './styles.module.css';
 */
export const [key: string]: string;