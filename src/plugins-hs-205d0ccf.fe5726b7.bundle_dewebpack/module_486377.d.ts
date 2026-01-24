/**
 * CSS Module Export Type Definition
 * Module: module_486377
 * Original ID: 486377
 * 
 * This module exports CSS styles for a filter panel component with dropdown functionality.
 * The styles include layout, theming, and interactive states for filter UI elements.
 */

/**
 * CSS Module Loader Function Type
 * Represents the webpack css-loader module export structure
 * 
 * @param exports - The module exports object to be populated
 * @param module - The current module object containing metadata
 * @param require - The require function for loading dependencies
 */
type CSSModuleLoader = (
  exports: NodeModule['exports'],
  module: NodeModule,
  require: NodeRequire
) => void;

/**
 * CSS Loader Push Array Item
 * Represents a single CSS module entry pushed to the loader
 */
interface CSSLoaderEntry {
  /** Module identifier */
  0: string | number;
  /** CSS content string */
  1: string;
}

/**
 * CSS Loader API
 * Interface for the css-loader utility that processes CSS modules
 */
interface CSSLoaderAPI {
  /**
   * Push CSS content to the loader
   * @param entry - Tuple containing module ID and CSS content
   */
  push(entry: [moduleId: string | number, cssContent: string]): void;
}

/**
 * CSS Loader Factory Function
 * Factory that creates a CSS loader instance
 * 
 * @param sourceMap - Whether to generate source maps for the CSS
 * @returns CSS loader API instance
 */
type CSSLoaderFactory = (sourceMap: boolean) => CSSLoaderAPI;

/**
 * Filter Panel CSS Module
 * 
 * Exports styles for:
 * - `.filter-panel` - Main container with flexbox layout
 * - `.filter-panel .dropdown-btn` - Dropdown button with hover states
 * - `.filter-panel .dropdown-btn span` - Button text with ellipsis overflow
 * - `.filter-panel .dropdown-btn .hs-iconfont-view` - Icon sizing
 * - `.spark-filter-panel.menu-item` - Individual menu item styling
 * - `.spark-filter-panel.menu-items` - Menu container with shadow and positioning
 * 
 * Theme: Dark mode with semi-transparent whites and #222222 hover states
 */
declare module 'module_486377' {
  const cssModuleLoader: CSSModuleLoader;
  export = cssModuleLoader;
}

/**
 * CSS Content Export
 * The actual CSS string exported by this module
 */
declare const CSS_CONTENT: string;

export type { 
  CSSModuleLoader, 
  CSSLoaderEntry, 
  CSSLoaderAPI, 
  CSSLoaderFactory 
};

export { CSS_CONTENT };