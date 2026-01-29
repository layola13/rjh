/**
 * CSS module exports for dropdown component styles
 * @module DropdownStyles
 */

/**
 * Type definition for CSS module loader function
 * @param sourceMap - Whether to include source maps in the CSS output
 * @returns CSS module loader instance with push method
 */
type CSSModuleLoader = (sourceMap: boolean) => {
  /**
   * Adds CSS content to the module
   * @param entry - Tuple containing module ID and CSS content string
   */
  push(entry: [string, string]): void;
};

/**
 * Webpack module factory function for dropdown component CSS
 * @param exports - Module exports object to be populated
 * @param module - Webpack module object containing module metadata
 * @param require - Webpack require function for loading dependencies
 */
declare function dropdownStylesModule(
  exports: Record<string, unknown>,
  module: { id: string; exports: Record<string, unknown> },
  require: (moduleId: number) => CSSModuleLoader
): void;

/**
 * CSS class names available in the dropdown styles module
 */
interface DropdownStylesClasses {
  /** Container for dropdown component with flex layout */
  'dropdown-container': string;
  /** Individual dropdown item wrapper */
  'dropdown-item': string;
  /** Collapsible content area of dropdown */
  'dropdown-content': string;
  /** Animated arrow indicator for dropdown state */
  'dropdown-arrow': string;
  /** Active state class for visible dropdown content */
  'dropdown-content-active': string;
  /** Active state class for rotated dropdown arrow */
  'dropdown-arrow-active': string;
}

/**
 * Raw CSS content for dropdown component
 * Includes styles for:
 * - Flex container layout with 6px gap
 * - Label styling with cursor pointer and bold font
 * - Hidden content area that displays on activation
 * - Animated triangle arrow with 180° rotation on activation
 * - Pre-wrap text formatting for content paragraphs
 */
declare const dropdownStyles: string;

export { DropdownStylesClasses, dropdownStyles, dropdownStylesModule };
export default dropdownStylesModule;