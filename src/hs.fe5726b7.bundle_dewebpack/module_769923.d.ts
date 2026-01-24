/**
 * CSS module loader function type definition
 * This module exports CSS styles for radio button card components
 */

/**
 * Webpack CSS loader module function
 * @param exports - The module exports object that will contain the CSS content
 * @param module - The current module object
 * @param require - The webpack require function for loading dependencies
 */
declare module 'module_769923' {
  /**
   * CSS Module Export Interface
   * Represents the structure returned by the CSS loader
   */
  interface CSSModuleExports {
    /**
     * Pushes CSS content array to the module
     * @param content - Array containing module ID and CSS string
     */
    push(content: [string | number, string]): void;
  }

  /**
   * CSS Loader Factory Function
   * @param sourceMap - Whether to include source maps in the output
   * @returns CSS module exports object with push method
   */
  type CSSLoaderFactory = (sourceMap: boolean) => CSSModuleExports;

  /**
   * Radio Button Card CSS Styles
   * Contains styles for:
   * - .radio-button-card-wrapper: Main container with flex layout
   * - .radio-button-card-left-part: Left section with label text
   * - .radio-button-card-right-part: Right section with radio buttons
   * - .right-property-bar-radio-button: Variant for property bar usage
   * - .global-en: English language specific overrides
   */
  const styles: string;

  export = styles;
}

/**
 * CSS Class Names exported by this module
 */
declare namespace RadioButtonCardStyles {
  /**
   * Main wrapper class for radio button card component
   * - Display: flex
   * - Height: 58px
   * - Full width with space-between layout
   * - Bottom border separator
   */
  export const radioButtonCardWrapper = 'radio-button-card-wrapper';

  /**
   * Left part of the card containing the label
   * - Color: #33353B
   * - Font size: 14px
   * - Font weight: bold
   */
  export const radioButtonCardLeftPart = 'radio-button-card-left-part';

  /**
   * Right part of the card containing radio button options
   * - Font size: 12px
   * - 20px margin between radio containers
   */
  export const radioButtonCardRightPart = 'radio-button-card-right-part';

  /**
   * Variant modifier for right property bar usage
   * - Height: 30px
   * - No bottom border
   * - Left-aligned layout
   */
  export const rightPropertyBarRadioButton = 'right-property-bar-radio-button';

  /**
   * Radio button container element
   * - 20px right margin (except last child)
   * - 5px right margin in property bar variant
   */
  export const radioContainer = 'radio-container';

  /**
   * Global English language modifier
   * - Normal word breaking behavior
   */
  export const globalEn = 'global-en';
}

export { RadioButtonCardStyles };