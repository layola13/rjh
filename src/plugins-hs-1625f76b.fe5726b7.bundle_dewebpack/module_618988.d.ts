/**
 * CSS module export type definition
 * Module: module_618988
 * Original ID: 618988
 * 
 * This module exports CSS styles for dialog toolbar tips component
 */

/**
 * CSS Module Loader Function Type
 * @param exports - The module exports object
 * @param require - The require function for loading dependencies
 * @param moduleLoader - The CSS loader utility function
 */
type CSSModuleLoader = (
  exports: CSSModuleExports,
  require: RequireFunction,
  moduleLoader: CSSLoaderFunction
) => void;

/**
 * CSS Module Exports Interface
 */
interface CSSModuleExports {
  /** Module identifier */
  id: string | number;
  /** Module exports content */
  exports: CSSLoaderResult;
}

/**
 * Require function type for module loading
 */
type RequireFunction = (moduleId: number) => CSSLoaderFunction;

/**
 * CSS Loader function that processes CSS content
 * @param sourceMap - Whether to include source maps
 * @returns CSS loader result object
 */
type CSSLoaderFunction = (sourceMap: boolean) => CSSLoaderResult;

/**
 * CSS Loader Result Interface
 */
interface CSSLoaderResult {
  /**
   * Push CSS content to the loader
   * @param content - Array containing module ID and CSS string
   */
  push(content: [string | number, string]): void;
}

/**
 * CSS Class Names exported by this module
 */
interface DialogToolbarTipsStyles {
  /** Main dialog toolbar tips container */
  dialogToolbarTips: string;
  /** Individual toolbar tip item */
  itemToolbarTip: string;
  /** SVG icon container */
  svgItem: string;
  /** Text content container */
  itemTxt: string;
  /** Bold font styling for item text */
  boldItemFont: string;
  /** Hide utility class */
  hide: string;
  /** Checkbox lock scale variant 2 */
  checkbox_lock_scale_v2: string;
}

/**
 * CSS Content exported by this module
 * Contains styles for:
 * - .dialogToolbarTips: Fixed position dialog (z-index: 102, centered at top: 100px)
 * - .itemToolbarTip: 50px height toolbar items with light gray text
 * - .svgItem: 50x50px inline-block SVG containers
 * - .itemTxt: Floated text containers
 * - .boldItemFont: Dark text emphasis (#4B4B4B)
 * - .hide: Display none utility
 * - .checkbox_lock_scale_v2: Full width checkbox with custom margins
 */
declare const styles: DialogToolbarTipsStyles;

export default styles;
export { DialogToolbarTipsStyles, CSSModuleExports, CSSLoaderFunction, CSSLoaderResult };