/**
 * CSS Module type definitions
 * This module provides type-safe access to CSS class names exported from a stylesheet.
 */

/**
 * CSS Modules class name mapping
 * Maps CSS class names to their generated, scoped identifiers
 */
interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Default export: CSS class name mappings from the imported stylesheet
 * Returns undefined if the CSS module has no local class definitions
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * Re-exported members from the CSS loader utility module (if any)
 * Includes any named exports from the underlying CSS processing library
 */
export * from './css-loader-utils';