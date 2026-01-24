/**
 * CSS Module type definition
 * Represents a CSS module with typed class name exports
 */

/**
 * CSS class name mappings exported by the module
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Default export: CSS module class name mappings
 * Returns undefined if the module has no local class names
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * Re-exports all named exports from the underlying CSS module
 * (excluding the default export)
 */
export * from './159341';