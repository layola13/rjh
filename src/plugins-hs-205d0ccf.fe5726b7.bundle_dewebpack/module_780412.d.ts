/**
 * CSS module loader type definition
 * Module: module_780412
 * Original ID: 780412
 * 
 * This module exports CSS styles for a thumbnail view topbar component with dropdown functionality.
 * The styles define the appearance and behavior of a custom dropdown button with selectable items.
 */

/**
 * CSS Module Export Function
 * 
 * @param e - Module exports object
 * @param t - Module metadata (unused)
 * @param n - Webpack require function for loading dependencies
 */
declare function cssModuleLoader(
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
 * Webpack require function interface
 */
interface WebpackRequire {
  /**
   * Loads a module by its ID
   * @param moduleId - The unique identifier of the module to load
   * @returns The loaded module (typically a CSS loader in this context)
   */
  (moduleId: number): CSSLoader;
}

/**
 * CSS Loader interface
 * Handles the processing and injection of CSS content
 */
interface CSSLoader {
  /**
   * Pushes CSS content to the loader
   * @param content - Array containing module ID and CSS string
   */
  push(content: [string | number, string]): void;
}

/**
 * CSS Module Exports interface
 * Represents the structure of a CSS module's exports
 */
interface CSSModuleExports {
  /** CSS loader instance or CSS content string */
  [key: string]: unknown;
}

/**
 * CSS Content Structure
 * Defines the styles for thumbnail view topbar dropdown component
 * 
 * Styles include:
 * - .thumbnail-view-topbar .drop-button - Main dropdown button container
 * - .current-item - Currently selected item display
 * - .sub-items - Dropdown menu items container
 * - .sub-item - Individual dropdown menu item
 * - Hover and selected states
 */
interface ThumbnailViewTopbarStyles {
  /** Main dropdown button styles with border and positioning */
  'drop-button': string;
  /** Current selected item display area (108x24px) */
  'current-item': string;
  /** Hover state for current item */
  'current-item.hover': string;
  /** Selected state for current item */
  'current-item.selected': string;
  /** Expand/collapse icon positioning */
  'tuozhan': string;
  /** Text description styling (12px font) */
  'text-description': string;
  /** Hover state for text with blue color (#396EFE) */
  'text-description.hover': string;
  /** Dropdown submenu items container with shadow */
  'sub-items': string;
  /** Individual submenu item (108x24px) */
  'sub-item': string;
  /** Hover state for submenu item (#F5F5F5 background) */
  'sub-item.hover': string;
  /** Current/active submenu item (#ECF1FF background) */
  'sub-item.current': string;
}

export { cssModuleLoader, WebpackRequire, CSSLoader, CSSModuleExports, ThumbnailViewTopbarStyles };