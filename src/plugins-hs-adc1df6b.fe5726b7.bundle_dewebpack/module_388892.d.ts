/**
 * CSS module type definitions
 * Provides type-safe access to CSS class names exported from a CSS module
 */

/**
 * CSS class name mapping interface
 * Maps CSS class names to their generated/scoped equivalents
 */
interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Default export: CSS module class names
 * Returns an object mapping original class names to their scoped versions,
 * or undefined if no locals are exported
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * Re-exported members from the underlying CSS module loader
 * Includes any additional properties or methods exposed by the CSS module system
 */
export * from './css-module-loader';