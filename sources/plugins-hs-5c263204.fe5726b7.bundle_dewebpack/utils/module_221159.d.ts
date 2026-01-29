/**
 * CSS Module type definitions
 * 
 * This module represents a CSS Modules file with its associated styles and locals.
 * It provides type-safe access to CSS class names exported from the module.
 */

/**
 * CSS class name mapping exported by the CSS module.
 * Maps class names defined in the CSS file to their hashed/scoped equivalents.
 */
export type CSSModuleLocals = Record<string, string> | undefined;

/**
 * Default export containing the CSS module's class name mappings.
 * Returns undefined if no class names are exported.
 */
declare const cssModuleLocals: CSSModuleLocals;

export default cssModuleLocals;

/**
 * Re-exported members from the CSS module loader (excluding 'default').
 * These may include runtime utilities or metadata about the loaded styles.
 */
export * from './css-module-loader';