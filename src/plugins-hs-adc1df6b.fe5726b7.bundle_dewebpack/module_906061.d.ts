/**
 * CSS Modules type definitions for module_906061
 * 
 * This module exports CSS class names as a typed object.
 * It represents a webpack css-loader module with CSS Modules enabled.
 */

/**
 * CSS class names exported by this module.
 * Each property represents a local CSS class name that can be used in components.
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Default export containing the CSS class name mappings.
 * Returns the locals object from the CSS module, or undefined if not available.
 * 
 * @example
 * import styles from './module_906061';
 * const className = styles.myClass;
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

export default cssModuleLocals;

/**
 * Re-exported members from the underlying CSS module (excluding 'default').
 * These represent any named exports from the original CSS module.
 */
export * from './css-module-base';