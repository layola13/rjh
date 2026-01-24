/**
 * CSS module definition for large view icon click area component
 * @module LargeViewIconClickArea
 */

/**
 * CSS module exports for the large view icon click area styles
 * This module contains styles for an interactive icon with hover effects
 */
declare module '*.css' {
  const styles: string;
  export default styles;
}

/**
 * Webpack loader function type
 * @param useSourceMap - Whether to include source maps in the CSS output
 * @returns Array containing module metadata and CSS content
 */
type WebpackCSSLoader = (useSourceMap: boolean) => {
  push: (entry: [string, string, string]) => void;
};

/**
 * CSS content for large view icon click area component
 * 
 * Styles include:
 * - `.largeviewiconclickarea`: Pointer cursor for clickable area
 * - `.largeviewiconclickarea #large-view-img`: Base icon styles (16x16px, white background, rounded)
 * - `.largeviewiconclickarea #large-view-img:hover`: Hover state with primary color (#327DFF) and shadow
 */
export interface LargeViewIconClickAreaStyles {
  /**
   * Main clickable area container
   * - cursor: pointer
   */
  largeviewiconclickarea: string;
  
  /**
   * Large view icon element
   * - Size: 16px × 16px
   * - Border radius: 8px (circular)
   * - Background: #FFFFFF (white)
   * - Hover background: #327DFF (primary blue)
   * - Hover shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1)
   */
  'large-view-img': string;
}

/**
 * CSS module export structure
 */
export const cssContent: string;

/**
 * Primary highlight color used throughout the component
 * @constant
 */
export const MAIN_COLOR = '#327DFF';

/**
 * Icon dimensions
 * @constant
 */
export const ICON_SIZE = 16;

/**
 * Icon border radius (half of size for circular shape)
 * @constant
 */
export const ICON_BORDER_RADIUS = 8;