/**
 * CSS Module type definitions for loading icon styles
 * @module LoadingIconStyles
 */

/**
 * CSS class names exported by the loading icon stylesheet module
 */
export interface LoadingIconStyles {
  /**
   * Base loading icon container class
   * - Display: block
   * - Text alignment: center
   * - Background: transparent
   */
  loadingIcon: string;

  /**
   * Hidden state modifier class
   * - Display: none
   */
  hidden: string;

  /**
   * Centered position modifier class
   * - Position: absolute
   * - Centered at 50% viewport with 40px offset
   * - Fixed dimensions: 40px × 40px
   */
  center: string;
}

/**
 * Default export of CSS module class names
 */
declare const styles: LoadingIconStyles;
export default styles;