/**
 * CSS Module type definitions
 * This module handles CSS imports with CSS Modules support
 */

/**
 * CSS class names mapping from the imported stylesheet
 * Maps local class names to their hashed/scoped counterparts
 */
export interface CSSModuleClasses {
  readonly [key: string]: string;
}

/**
 * Default export - the CSS module's class name mappings
 * Returns undefined if no local classes are defined
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

export default cssModuleLocals;

/**
 * Re-exports all named exports from the original CSS module
 * (excluding the default export)
 */
export * from './original-css-module';