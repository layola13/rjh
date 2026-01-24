/**
 * CSS Module type definitions
 * Provides type-safe access to CSS class names exported from a CSS module
 */

/**
 * CSS class name mappings exported by the module.
 * Each key represents a class name defined in the source CSS file,
 * and the value is the transformed/hashed class name used at runtime.
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Default export containing the CSS module's class name mappings.
 * Returns undefined if no local class names are defined in the module.
 * 
 * @example
 * import styles from './styles.module.css';
 * const className = styles?.buttonPrimary;
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * Re-exported utilities from the CSS loader runtime.
 * These are typically internal APIs used by the module system.
 */
export * from './css-loader-runtime';