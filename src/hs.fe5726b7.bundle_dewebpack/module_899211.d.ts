/**
 * CSS Module Type Definitions
 * Module: module_899211
 * Original ID: 899211
 * 
 * This module exports CSS class names for a help tip/tooltip component.
 */

/**
 * CSS class names exported by this module
 */
export interface HelptipStyles {
  /**
   * Main container for the help tip component
   * - height: 16px
   * - margin-top: 5px
   * - z-index: 2
   */
  helptipContainer: string;

  /**
   * Tooltip container element
   * - position: absolute
   * - width: 120px
   * - top: 78px
   * - left: 81px
   * - border: solid 1px #717171
   * - border-radius: 4px
   */
  tooltipContainer: string;

  /**
   * Arrow pointer for the tooltip
   * - Creates a CSS triangle using borders
   * - border-color: #717171 (top)
   * - position: absolute at (55px, 75px)
   * - includes drop-shadow filter
   */
  tipArrow: string;

  /**
   * Tooltip content styling
   * - font-size: 11px
   * - padding: 5px
   * - color: white
   * - background-color: #717171
   * - line-height: 16px
   */
  tooltipStyle: string;
}

/**
 * CSS Module exports
 * Use these class names to style help tip components
 */
declare const styles: HelptipStyles;
export default styles;