/**
 * CSS Module Exports
 * Provides typed access to CSS class names and styles
 */

/**
 * CSS class name mappings for the module.
 * Contains key-value pairs where keys are the original class names
 * and values are the transformed/hashed class names used in production.
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Default export containing the CSS module's local class name mappings.
 * Returns undefined if no local class names are defined.
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

export default cssModuleLocals;

/**
 * Re-exported members from the underlying CSS processing module.
 * May include runtime utilities or additional metadata about the styles.
 */
export * from './style-processor';