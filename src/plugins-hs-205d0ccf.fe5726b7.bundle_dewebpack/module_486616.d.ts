/**
 * CSS Module for teaching ability button component
 * Exports CSS styles for light and dark theme variants of a teaching ability button
 */

/**
 * Webpack CSS loader module function type
 * @param exports - Module exports object
 * @param module - Webpack module metadata
 * @param require - Webpack require function for loading dependencies
 */
type WebpackCSSModuleLoader = (
  exports: Record<string, unknown>,
  module: WebpackModule,
  require: WebpackRequire
) => void;

/**
 * Webpack module metadata interface
 */
interface WebpackModule {
  /** Unique module identifier */
  id: string | number;
  /** Module exports object */
  exports: unknown;
  /** Whether module has been loaded */
  loaded?: boolean;
}

/**
 * Webpack require function interface
 */
interface WebpackRequire {
  /** Load module by ID */
  (moduleId: string | number): unknown;
  /** Additional webpack runtime properties */
  [key: string]: unknown;
}

/**
 * CSS content array structure returned by css-loader
 * Format: [moduleId, cssContent, sourceMap?]
 */
type CSSLoaderResult = Array<[string | number, string, string?]>;

/**
 * CSS loader API interface
 */
interface CSSLoaderAPI {
  /**
   * Push CSS content to the result array
   * @param item - Tuple of [moduleId, cssContent, sourceMap?]
   */
  push(item: [string | number, string, string?]): void;
  /** Convert result to string */
  toString(): string;
}

/**
 * CSS loader factory function type
 * @param sourceMap - Whether to include source maps
 * @returns CSS loader API instance
 */
type CSSLoaderFactory = (sourceMap: boolean) => CSSLoaderAPI;

/**
 * Teaching ability button CSS styles
 * 
 * Provides styling for:
 * - Container layout with relative positioning
 * - Button wrapper with flexbox alignment
 * - Interactive button with hover states
 * - Light theme variant (.teaching-light)
 * - Dark theme variant (.teaching-black)
 * 
 * CSS Classes:
 * - `.teaching-ability-button-container` - Main container
 * - `.teaching-ability-button-wrapper` - Button wrapper with theme variants
 * - `.button` - Interactive button element
 * - `.title` - Button text label
 * - `.menu-arrow` - Arrow icon indicator
 */
declare const cssModule: WebpackCSSModuleLoader;

export default cssModule;

/**
 * CSS class names exported by this module
 */
export interface TeachingAbilityButtonStyles {
  /** Main container class */
  'teaching-ability-button-container': string;
  /** Button wrapper class */
  'teaching-ability-button-wrapper': string;
  /** Light theme variant */
  'teaching-light': string;
  /** Dark theme variant */
  'teaching-black': string;
  /** Button element */
  'button': string;
  /** Title text */
  'title': string;
  /** Menu arrow icon */
  'menu-arrow': string;
}