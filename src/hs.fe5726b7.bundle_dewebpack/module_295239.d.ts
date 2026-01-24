/**
 * Webpack CSS loader module type definition
 * Module: module_295239
 * Original ID: 295239
 * 
 * This module exports CSS styles for a browser reminder modal dialog.
 * It uses a CSS loader (likely css-loader) to process and inject styles.
 */

/**
 * CSS Loader push function signature
 * Pushes CSS content into the style loader
 */
interface CSSLoaderPush {
  (data: [string | number, string]): void;
}

/**
 * CSS Module exports from webpack css-loader
 * Returns an array with a push method for adding CSS rules
 */
interface CSSModuleExports {
  /** Push method to add CSS rules to the loader */
  push: CSSLoaderPush;
  /** Module ID */
  id?: string | number;
  /** Other potential properties from css-loader */
  [key: string]: unknown;
}

/**
 * Webpack module factory function signature
 * 
 * @param module - The current module object containing exports
 * @param exports - The exports object (same as module.exports)
 * @param require - Webpack's require function for loading dependencies
 */
declare function moduleFn(
  module: { 
    /** Unique module identifier */
    id: string | number; 
    /** Module exports object */
    exports: CSSModuleExports;
  },
  exports: CSSModuleExports,
  require: (moduleId: number) => (sourceMap: boolean) => CSSModuleExports
): void;

/**
 * CSS content for browser reminder modal
 * Contains styles for:
 * - .modal-browser-reminder: Full-screen overlay with semi-transparent background
 * - .reminder-dialog: Centered modal dialog box
 * - .close: Close button styling
 * - .reminder-text-recommendation-font: Recommendation text styling
 * - .button-line: Action button container
 * - .button-download-chrome/.button-download-client: Download button styles
 * - .global-en locale-specific adjustments
 */
declare const cssContent: string;

export default moduleFn;