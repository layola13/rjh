/**
 * CSS Module Type Definition
 * 
 * This module represents a dynamically loaded CSS module with local class names.
 * It provides type-safe access to CSS classes exported from a stylesheet.
 */

/**
 * CSS module locals interface
 * Contains the mapping of CSS class names to their transformed/hashed versions
 */
export interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Default export representing the CSS module's local class names
 * Returns the locally scoped class name mappings if available, otherwise undefined
 */
declare const cssModuleLocals: CSSModuleLocals | undefined;

export default cssModuleLocals;

/**
 * Re-exported named exports from the original CSS module
 * Allows importing specific class names directly from the module
 */
export * from './styles';