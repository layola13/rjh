/**
 * CSS module definition for house-type-panel component
 * @module HouseTypePanelStyles
 */

/**
 * Webpack module loader function type
 * @param e - Module exports object
 * @param t - Module require/import utilities (unused)
 * @param n - Webpack require function for loading dependencies
 */
type WebpackModuleLoader = (
  e: { id: string; exports: CssModuleExports },
  t: unknown,
  n: WebpackRequire
) => void;

/**
 * Webpack require function interface
 * @param moduleId - Numeric or string identifier of the module to require
 * @returns The exported module content
 */
interface WebpackRequire {
  (moduleId: number | string): unknown;
}

/**
 * CSS module exports interface
 * Represents the structure of a CSS module loader
 */
interface CssModuleExports {
  /**
   * Pushes CSS content to the module
   * @param entry - Tuple containing module ID and CSS string
   */
  push(entry: [string, string]): void;
}

/**
 * CSS styles for house-type-panel component
 * 
 * Provides styling for:
 * - Panel title with text and settings icon
 * - Component grid layout with flex-wrap
 * - Image button states (disabled/edit mode)
 * - Free trial badge with gradient background
 * - VIP icon positioning
 * - Edit mode filter effects
 * - Global English locale overrides
 */
declare module "module_488135" {
  /**
   * Module export - CSS module content
   * Contains compiled CSS for house-type-panel component including:
   * - Title bar layout and typography
   * - Settings button with hover states
   * - Component grid container
   * - Free trial promotional badge
   * - VIP indicator icon
   * - Edit mode opacity filter
   * - Internationalization overrides
   */
  const content: CssModuleExports;
  export = content;
}

/**
 * Dependency modules referenced in this CSS module
 */
declare module "992716" {
  /**
   * Asset loader utility (likely for image URLs)
   */
  export default function assetLoader(path: string): string;
}

declare module "986380" {
  /**
   * CSS loader factory
   * @param sourceMap - Whether to include source maps
   * @returns CSS module exports object
   */
  export default function cssLoader(sourceMap: boolean): CssModuleExports;
}

declare module "592953" {
  /**
   * Image asset path for English locale free trial badge background
   */
  const imagePath: string;
  export default imagePath;
}