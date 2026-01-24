/**
 * CSS Module Type Definitions
 * 
 * This module exports CSS class names for teaching icon font styles.
 * Supports light and dark theme variants with hover states.
 * 
 * @module TeachingIconFontStyles
 */

/**
 * CSS class name mappings for teaching icon font components
 */
export interface TeachingIconFontClasses {
  /**
   * Base class for teaching icon font
   * - Default color: #000000 (black)
   * - Hover color: #396efe (blue)
   * - Cursor: pointer
   */
  'teaching-iconfont': string;

  /**
   * Light theme variant for teaching icon font
   * - Color: #000000 (black)
   * - Hover color: #396efe (blue)
   */
  'teaching-light': string;

  /**
   * Dark theme variant for teaching icon font
   * - Color: #fff (white)
   * - Hover color: #396efe (blue)
   */
  'teaching-black': string;
}

/**
 * Default export of CSS class names
 */
declare const styles: TeachingIconFontClasses;

export default styles;