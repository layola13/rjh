/**
 * CSS module for AIGC image view component
 * Provides styles for image display, category filters, and dropdown menus
 */

/**
 * Webpack module loader function type
 * @param module - The module exports object
 * @param exports - The exports object (same as module.exports)
 * @param require - The webpack require function for loading dependencies
 */
type WebpackModuleLoader = (
  module: WebpackModule,
  exports: any,
  require: WebpackRequire
) => void;

/**
 * Webpack module object
 */
interface WebpackModule {
  /** Module identifier */
  id: string | number;
  /** Module exports */
  exports: any;
  /** Whether the module has been loaded */
  loaded?: boolean;
  /** Parent modules that depend on this module */
  parent?: WebpackModule;
}

/**
 * Webpack require function for loading modules
 */
interface WebpackRequire {
  /** Load a module by ID */
  (moduleId: string | number): any;
  /** Cache of loaded modules */
  c?: Record<string | number, WebpackModule>;
  /** Module definitions */
  m?: Record<string | number, WebpackModuleLoader>;
}

/**
 * CSS loader module that pushes CSS content to an array
 */
interface CSSLoaderModule {
  /**
   * Push CSS content with module metadata
   * @param entry - Array containing module ID and CSS string
   */
  push(entry: [string | number, string]): void;
}

/**
 * CSS Module Export
 * Returns a CSS loader instance configured for this module's styles
 * 
 * @remarks
 * This module contains styles for:
 * - `.aigc-image-view` - Main container with flex layout (148px height)
 * - `.image-view-left` - Left panel with image container (174px × 148px)
 * - `.image-view-expand` - Expandable overlay button with blur effect
 * - `.image-view-right` - Right panel with category tree (60px width)
 * - `.image-category-filter-item` - Category filter items with hover states
 * - `.image-search-category-dropdown` - Dropdown menu for subcategories
 * 
 * @param moduleId - The webpack module ID (986380)
 * @returns CSS loader instance with push method
 */
declare function cssModuleExport(moduleId: number): CSSLoaderModule;

export default cssModuleExport;

/**
 * CSS class names available in this module
 */
export interface AIGCImageViewStyles {
  /** Main container class */
  'aigc-image-view': string;
  /** Left panel container */
  'image-view-left': string;
  /** Image container with background */
  'image-view-image-container': string;
  /** Expand button overlay */
  'image-view-expand': string;
  /** Expand button icon */
  'image-view-expand-button': string;
  /** Right panel with categories */
  'image-view-right': string;
  /** Category tree container */
  'image-category-tree': string;
  /** Category filter item */
  'image-category-filter-item': string;
  /** Category name label */
  'image-category-name': string;
  /** Selected category state */
  'selected-item': string;
  /** Active menu container state */
  'menu-container-active': string;
  /** Category text with dropdown */
  'image-category-more-text': string;
  /** Dropdown button for categories */
  'image-category-dropdown-button': string;
  /** Category dropdown menu */
  'image-search-category-dropdown': string;
  /** Submenu container */
  'image-search-category-dropdown-submenu': string;
  /** Submenu item */
  'image-search-category-dropdown-menu-item': string;
  /** Submenu main section */
  'sub-menu-main': string;
  /** Active submenu main section */
  'sub-menu-main-active': string;
  /** Submenu list */
  'sub-menu-ul': string;
  /** Active submenu container */
  'sub-menu-container-active': string;
  /** Popover container */
  'pop-container': string;
  /** Popover list */
  'pop-container-ul': string;
  /** Menu item class */
  'menu-item': string;
  /** Homestyler UI components namespace */
  'homestyler-ui-components': string;
  /** Submenu container class */
  'sub-menu-container': string;
  /** Text content wrapper */
  'text': string;
}