/**
 * CSS Module type definitions
 * Provides type-safe access to CSS class names exported from a CSS/SCSS module
 */

/**
 * CSS Module class names mapping
 * Maps the original class names defined in the stylesheet to their hashed equivalents
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Default export represents the CSS module's local class names
 * Returns undefined if the module has no local classes
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

export default cssModuleLocals;

/**
 * Re-exports all named exports from the underlying CSS module
 * Allows direct import of specific class names if the module supports it
 */
export * from './module_879842';