/**
 * CSS module loader type definition
 * 
 * This module exports CSS styles for AIGC (AI Generated Content) picture upload component.
 * It uses a CSS loader (likely css-loader) to process and inject styles.
 * 
 * @module AigcPictureStyles
 */

/**
 * CSS loader function type
 * Represents the function signature returned by the CSS loader module (ID: 986380)
 * 
 * @param sourceMap - Whether to generate source maps for the CSS
 * @returns A CSS loader instance with a push method for adding style rules
 */
type CssLoaderFunction = (sourceMap: boolean) => CssLoader;

/**
 * CSS loader instance interface
 * Provides methods to register CSS content with the bundler
 */
interface CssLoader {
  /**
   * Adds a CSS module entry to the loader
   * 
   * @param entry - Tuple containing module ID and CSS content string
   */
  push(entry: [moduleId: string, cssContent: string]): void;
}

/**
 * Webpack module exports interface
 */
interface ModuleExports {
  /** The CSS loader instance for this module */
  exports: CssLoader;
  /** The unique module identifier */
  id: string;
}

/**
 * Webpack require function type
 * 
 * @param moduleId - The numeric ID of the module to load
 * @returns The loaded module (in this case, a CSS loader function)
 */
type WebpackRequire = (moduleId: number) => CssLoaderFunction;

/**
 * AIGC Picture Component CSS Module
 * 
 * This module defines styles for:
 * - Picture upload button positioning and styling
 * - Spark theme variant styles
 * - Icon and text styling within upload controls
 * - Re-upload button with hover effects
 * - Tooltip styling
 * - "New" badge positioning
 * - Modal customizations
 * 
 * @param exports - The module exports object to populate
 * @param _unused - Unused parameter (typically for module dependencies)
 * @param require - Webpack's require function for loading dependencies
 */
declare function module_479576(
  exports: ModuleExports,
  _unused: unknown,
  require: WebpackRequire
): void;

export default module_479576;

/**
 * CSS Class Names exported by this module:
 * 
 * - `.aigc-picture.spark` - Absolute positioned container (top: 19px, right: 45px)
 * - `.aigc-picture .aigc-upload-picture-icon` - Upload button with flex layout
 * - `.aigc-picture .aigc-upload-picture-icon.spark` - Spark theme variant with gray background
 * - `.aigc-picture .aigc-upload-picture-icon .hs-iconfont-view` - Icon with right margin
 * - `.aigc-picture .aigc-upload-picture-icon .aigc-upload-icon-text` - Scaled text (0.9)
 * - `.aigc-picture .aigc-reupload-icon` - Re-upload button with rounded corners
 * - `.aigc-picture .aigc-reupload-icon:hover` - Hover state with gray background
 * - `.aigc-picture .aigc-upload-picture-tooltip` - Tooltip with no text wrapping
 * - `.aigc-picture .aigc-reupload-tooltip` - Tooltip with inherited width
 * - `.aigc-picture .picture-new` - "New" badge positioned absolutely
 * - `.aigc-modal .homestyler-modal-right-btn` - Hidden modal button
 */
export type AigcPictureClassNames =
  | 'aigc-picture'
  | 'aigc-upload-picture-icon'
  | 'aigc-reupload-icon'
  | 'aigc-upload-picture-tooltip'
  | 'aigc-reupload-tooltip'
  | 'picture-new'
  | 'aigc-modal'
  | 'spark'
  | 'hs-iconfont-view'
  | 'aigc-upload-icon-text'
  | 'homestyler-modal-right-btn';