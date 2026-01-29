/**
 * CSS Module type definitions
 * 
 * This module exports CSS class name mappings for a CSS/SCSS module.
 * The default export contains the locally scoped class names.
 */

/**
 * CSS Module class name mappings
 * Maps original class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Default export containing the CSS module's class name mappings.
 * Returns undefined if no local class names are defined in the module.
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

export default cssModuleLocals;

/**
 * Re-exported named exports from the original CSS module
 * (if any were defined beyond the default export)
 */
export * from './original-css-module';