/**
 * CSS Module Declaration
 * @module module_541752
 * @description Type definitions for property bar label button CSS module
 */

/**
 * CSS module exports interface containing class name mappings
 */
export interface PropertyBarLabelButtonStyles {
  /**
   * Wrapper container with flexbox layout for label and button
   * - Display: flex
   * - Justify content: space-between
   * - Align items: center
   */
  'property-bar-labelbutton-wrapper': string;

  /**
   * Label element styling
   * - Color: #888888 (gray)
   * - Font size: 12px
   * - Display: inline-block
   * - Margin bottom: 5px
   */
  'property-bar-labelbutton-label': string;

  /**
   * Button element styling
   * - Width: 100px
   */
  'property-bar-labelbutton-button': string;
}

/**
 * Default export of CSS module class names
 */
declare const styles: PropertyBarLabelButtonStyles;

export default styles;