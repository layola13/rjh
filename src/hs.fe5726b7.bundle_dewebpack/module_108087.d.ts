/**
 * CSS module loader type definitions
 * @module PopupWindowStyles
 * @description Type definitions for popup window CSS module exports
 */

/**
 * CSS Module Export Interface
 * Represents the structure returned by a CSS loader in webpack
 */
interface CSSModuleExport {
  /**
   * Unique identifier for this CSS module
   */
  id: string | number;

  /**
   * CSS content as a string
   */
  content: string;

  /**
   * Push method to add CSS rules to the module
   * @param rule - Tuple containing module ID and CSS content
   */
  push(rule: [string | number, string]): void;
}

/**
 * CSS Loader Factory Function
 * @param sourceMap - Whether to include source maps in the output
 * @returns CSS module export object with push method
 */
declare function cssLoader(sourceMap: boolean): CSSModuleExport;

/**
 * Webpack Module Definition Function
 * @param exports - Module exports object
 * @param require - Webpack require function for loading dependencies
 * @param module - Current module metadata
 */
declare function webpackModule(
  exports: Record<string, unknown>,
  require: (moduleId: number) => CSSModuleExport,
  module: { id: string | number; exports: Record<string, unknown> }
): void;

/**
 * Popup Window CSS Classes
 * @description CSS class names and styles for popup window components
 */
declare module 'PopupWindowStyles' {
  /**
   * Root container styles for popup windows
   * Includes reset styles and font family definitions
   */
  export const popupWindowOuter: string;

  /**
   * Main popup window container with shadow and border radius
   */
  export const popupwindows: string;

  /**
   * Wrapper elements with top rounded corners
   */
  export const windowWrapper: string;
  export const windowHeader: string;
  export const title: string;

  /**
   * Close button positioned in header
   */
  export const closeBtn: string;

  /**
   * Content area with background and padding
   */
  export const windowContents: string;

  /**
   * Inner content wrapper for text alignment
   */
  export const contentsWrapper: string;

  /**
   * UI upgrade variant styles (8px border radius, enhanced spacing)
   */
  export const uiUpgradePopwindow: string;
}

/**
 * CSS Content Export
 * The actual CSS string content for popup window styles
 */
export const cssContent: string;

/**
 * Module ID
 * Original webpack module identifier
 */
export const MODULE_ID = 108087;