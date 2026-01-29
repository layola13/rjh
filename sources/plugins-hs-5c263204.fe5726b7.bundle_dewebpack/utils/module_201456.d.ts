/**
 * CSS module exports for mirror pop modal styles
 * This module contains styling definitions for a modal dialog component
 * @module mirror-pop-modal-styles
 */

/**
 * Webpack loader function type for CSS modules
 * @param push - Method to add CSS content to the compilation
 */
type CSSLoaderPush = (content: [string, string]) => void;

/**
 * CSS Module loader interface
 */
interface CSSModuleLoader {
  /** Unique module identifier */
  id: string;
}

/**
 * Webpack require function type
 * @param moduleId - The ID of the module to require
 * @returns CSS loader with push method
 */
type WebpackRequire = (moduleId: number) => {
  push: CSSLoaderPush;
};

/**
 * Module exports type
 */
interface ModuleExports {
  /** CSS content and metadata */
  push: CSSLoaderPush;
}

/**
 * CSS Loader Module Export Function
 * Exports compiled CSS styles for the mirror pop modal component
 * 
 * @param exports - Module exports object to attach CSS content
 * @param module - Current module information containing the module ID
 * @param require - Webpack require function to load the CSS loader (module 986380)
 * 
 * @remarks
 * This module defines styles for:
 * - `.mirror-pop-modal-hidden` - Hides the modal completely
 * - `.mirror-pop-modal` - Full-screen overlay with semi-transparent background (z-index: 10000)
 * - `.mirror-area-modal` - Centered modal container (520x173px, white background, rounded corners)
 * - `.mirror-area-title` - Modal header with title and close button
 * - `.mirror-area-lb-info` - Information text area
 * - `.mirror-group-btn` - Button container with flex layout
 * - `.mirror-btn-base` - Base button styles
 * - `.mirror-btn-confirm` - Primary action button (blue background)
 * - `.mirror-btn-cancel` - Secondary cancel button
 * 
 * @example
 * // This module is typically auto-loaded by webpack's CSS loader chain
 * // The CSS will be injected into the page's style tags at runtime
 */
declare function loadMirrorPopModalStyles(
  exports: { exports: ModuleExports },
  module: CSSModuleLoader,
  require: WebpackRequire
): void;

export default loadMirrorPopModalStyles;

/**
 * CSS Class Names exported by this module
 */
export interface MirrorPopModalClasses {
  /** Class to hide the modal (display: none !important) */
  'mirror-pop-modal-hidden': string;
  
  /** Main modal overlay container - fixed positioning, full viewport coverage */
  'mirror-pop-modal': string;
  
  /** Modal content area - centered, 520x173px, white background */
  'mirror-area-modal': string;
  
  /** Modal header section with title and close button */
  'mirror-area-title': string;
  
  /** Title text styling - 20px, bold, Frutiger font family */
  'mirror-area-title-txt': string;
  
  /** Close button - 30px circular, hover effect */
  'mirror-area-tittle-close': string;
  
  /** Information label text area - gray color, 21px height */
  'mirror-area-lb-info': string;
  
  /** Button group container - flexbox, right-aligned */
  'mirror-group-btn': string;
  
  /** Base button styles - rounded, 36px height, gray background */
  'mirror-btn-base': string;
  
  /** Confirm button - blue background (#396efe), white text, min-width 110px */
  'mirror-btn-confirm': string;
  
  /** Cancel button - light gray background, blue text, right margin */
  'mirror-btn-cancel': string;
}