/**
 * CSS module loader export type definition
 * Module: module_799316
 * Original ID: 799316
 * 
 * This module exports CSS styles for a privacy wrapper component with dropdown functionality.
 * Includes styles for:
 * - Dropdown arrow flip animation
 * - SVG and image sizing/positioning
 * - Icon color schemes
 */

/**
 * CSS loader function signature
 * @param isDevelopment - Flag indicating if styles should include source maps
 * @returns CSS loader instance with push method
 */
interface CSSLoader {
  /**
   * Pushes CSS content to the stylesheet
   * @param content - Tuple containing module ID and CSS string
   */
  push(content: [string | number, string]): void;
}

/**
 * CSS loader factory function type
 * @param isDevelopment - When false, disables source maps for production builds
 * @returns Configured CSS loader instance
 */
type CSSLoaderFactory = (isDevelopment: boolean) => CSSLoader;

/**
 * Webpack module exports interface
 */
interface ModuleExports {
  exports: CSSLoader;
  id: string | number;
}

/**
 * CSS module require function
 * @param moduleId - The webpack module identifier (986380 in this case)
 * @returns CSS loader factory function
 */
type RequireFunction = (moduleId: number) => CSSLoaderFactory;

/**
 * Privacy wrapper CSS module
 * Exports dropdown arrow flip transformations and icon styles
 * 
 * CSS classes included:
 * - .privacywrapper .current-option .dropDownArrow.flipV - Rotated dropdown arrow (180deg)
 * - .privacywrapper svg, .privacywrapper img - Icon dimensions (18x18px) and positioning
 * - .privacywrapper svg path - Default icon fill color (#5f5f5f)
 * - .privacywrapper .current-option .dropDownArrow svg - Small arrow icon (8x8px)
 * - .privacywrapper .current-option .dropDownArrow svg path - Arrow stroke styling
 */
declare module "module_799316" {
  const moduleExports: CSSLoader;
  export = moduleExports;
}

/**
 * Module initialization function type
 * @param moduleExports - The module.exports object to populate
 * @param require - Webpack's require function for loading dependencies
 * @param moduleContext - The current module context containing id and other metadata
 */
export type ModuleInitializer = (
  moduleExports: ModuleExports,
  require: RequireFunction,
  moduleContext: ModuleExports
) => void;