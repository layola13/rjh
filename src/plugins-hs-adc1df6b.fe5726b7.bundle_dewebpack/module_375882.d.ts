/**
 * CSS Module type definitions
 * This module exports CSS class name mappings for type-safe styling
 */

/**
 * CSS class name mappings exported by the CSS module
 * Maps semantic class names to their generated/scoped equivalents
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Default export containing the CSS module's local class name mappings
 * Returns undefined if no local classes are defined in the module
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

export default cssModuleLocals;