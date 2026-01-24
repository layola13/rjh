/**
 * CSS Module type definitions
 * 
 * This module represents a CSS-in-JS module that exports CSS class names
 * and potentially other CSS-related values as a typed object.
 */

/**
 * CSS class names exported by the module.
 * Each property represents a CSS class that can be used in components.
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Default export containing the CSS module's local class name mappings.
 * Returns undefined if no local classes are defined.
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

export default cssModuleLocals;

/**
 * Re-exported members from the underlying CSS module implementation.
 * These may include utility functions or additional CSS-related exports.
 */
export * from './css-module-implementation';