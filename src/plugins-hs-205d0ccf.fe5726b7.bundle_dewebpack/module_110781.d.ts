/**
 * CSS Module Styles for TG Wall Components
 * 
 * This module exports CSS styles for:
 * - Input box container with centered positioning
 * - Head toolbar with fixed positioning and flex layout
 * - Zoom content scrollbar styling
 */

/**
 * CSS style definitions for TG Wall UI components
 */
declare module 'module_110781' {
  /**
   * Exported CSS module content
   * Contains styles for .tgwall-inputbox-container, .tgwall-headtool, and related elements
   */
  const styles: string;
  export default styles;
}

/**
 * CSS Classes exported by this module
 */
export interface TGWallStyles {
  /**
   * Container for input box with absolute centered positioning
   * - Positioned absolutely at 50% from left
   * - Translated -50% on both axes for perfect centering
   */
  'tgwall-inputbox-container': string;

  /**
   * Header toolbar component
   * - Absolute positioning at 30% from left, 56px from top
   * - Flexbox layout with space-around justification
   * - White background with 8px border radius
   * - 5px vertical, 10px horizontal padding
   */
  'tgwall-headtool': string;
}

/**
 * CSS content string containing all style rules
 */
export const cssContent: string;

/**
 * Array format used by webpack css-loader
 * Format: [moduleId, cssString, sourceMap]
 */
export type CSSLoaderExport = [string, string, boolean?];

export default cssContent;