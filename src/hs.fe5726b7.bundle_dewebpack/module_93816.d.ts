/**
 * CSS module loader function that registers dropdown component styles.
 * This module handles the styling for dropdown wrappers including arrow animations,
 * icon sizing, and SVG path fills.
 * 
 * @module DropdownStyles
 * @originalId 93816
 */

/**
 * Module exports type definition for Webpack CSS loader
 * @param e - Module exports object
 * @param t - Module metadata (unused in this module)
 * @param n - Webpack require function to load dependencies
 */
declare function loadDropdownStyles(
  e: { 
    /** Module exports object */
    exports: CSSModuleExports;
    /** Module identifier */
    id: string | number;
  },
  t: unknown,
  n: WebpackRequire
): void;

/**
 * Webpack require function type
 */
interface WebpackRequire {
  /**
   * Loads a module by its numeric ID
   * @param moduleId - The unique identifier of the module to load
   * @returns The CSS loader helper function
   */
  (moduleId: number): CSSLoader;
}

/**
 * CSS loader helper that processes CSS content
 */
interface CSSLoader {
  /**
   * Creates a CSS module array with source maps support
   * @param useSourceMap - Whether to include source maps
   * @returns CSS module array instance
   */
  (useSourceMap: boolean): CSSModuleArray;
}

/**
 * CSS module array containing styles and metadata
 */
interface CSSModuleArray {
  /**
   * Adds a CSS module entry to the array
   * @param entry - Tuple containing module ID and CSS content string
   */
  push(entry: [string | number, string]): void;
}

/**
 * Module exports object for CSS modules
 */
interface CSSModuleExports {
  /** The loaded CSS module array */
  default?: CSSModuleArray;
  [key: string]: unknown;
}

/**
 * CSS content for dropdown component styles.
 * 
 * Includes:
 * - `.dropdownwrapper .current-option .dropDownArrow.flipV` - Rotated arrow (180deg) for expanded state
 * - `.dropdownwrapper svg, .dropdownwrapper img` - Icon sizing (18x18px) with absolute positioning
 * - `.dropdownwrapper svg path` - Default SVG path fill color (#5f5f5f)
 * - `.dropdownwrapper .current-option .dropDownArrow svg` - Smaller arrow icon (8x8px)
 * - `.dropdownwrapper .current-option .dropDownArrow svg path` - Arrow stroke styling
 */
export type DropdownStylesCSS = string;

export default loadDropdownStyles;