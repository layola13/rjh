/**
 * CSS Module Loader Type Definition
 * 
 * This module exports CSS styles for checkbox components.
 * It uses a CSS-in-JS loader (likely css-loader) to inject styles into the application.
 */

/**
 * CSS Loader Module Factory Function
 * 
 * @param exports - The module exports object that will contain the CSS content
 * @param module - The module metadata object containing the module ID
 * @param require - The module require function to load dependencies (css-loader utility)
 */
declare module 'module_299333' {
  /**
   * CSS Module Export Interface
   * Represents the structure returned by the css-loader
   */
  interface CSSModuleExport {
    /**
     * Push method to add CSS content to the style array
     * 
     * @param content - Tuple containing module ID and CSS string content
     */
    push(content: [string, string]): void;
  }

  /**
   * CSS Loader Factory Function Type
   * 
   * @param sourceMap - Whether to include source maps in the output
   * @returns A CSS module export object with push method
   */
  type CSSLoaderFactory = (sourceMap: boolean) => CSSModuleExport;

  /**
   * Checkbox Component CSS Classes
   * 
   * This module provides styling for checkbox UI components including:
   * - .checkbtn - Base checkbox button styles with custom appearance
   * - .checkbtn:after - Checkmark indicator using CSS borders
   * - .checkbtn:focus - Focus state styling
   * - .checkbtn.checkbtn-checked - Checked state with primary blue background
   * - .checkboxContainer - Flex container for checkbox and label
   * - .checkboxContainer .inputlabel - Label text styling
   * - .checkboxContainer.disable - Disabled state with reduced opacity
   * - .checkboxContainer.single-line - Variant layout for single-line checkboxes
   */
  const styles: string;

  export = styles;
}

/**
 * Checkbox Component Style Classes
 * 
 * CSS class names available in this module:
 */
declare namespace CheckboxStyles {
  /**
   * Base checkbox button class
   * - 18x18px square with rounded corners
   * - White background with light gray border
   * - Custom checkmark using ::after pseudo-element
   */
  const checkbtn: string;

  /**
   * Checked state modifier class
   * - Blue background (#327DFF)
   * - Blue border matching background
   */
  const checkbtnChecked: string;

  /**
   * Checkbox container class
   * - 34px height
   * - Inline flex layout with vertical centering
   */
  const checkboxContainer: string;

  /**
   * Label text class
   * - Dark gray text color
   * - 8px left margin for spacing
   */
  const inputlabel: string;

  /**
   * Disabled state modifier class
   * - 50% opacity
   * - Not-allowed cursor
   */
  const disable: string;

  /**
   * Single-line variant modifier class
   * - Gray label text
   * - Right margin instead of left for label
   */
  const singleLine: string;
}