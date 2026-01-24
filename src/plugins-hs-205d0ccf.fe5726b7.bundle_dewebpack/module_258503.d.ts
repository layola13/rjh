/**
 * CSS Module Exports Type Definition
 * Module: module_258503
 * Original ID: 258503
 * 
 * This module exports CSS styles for a pure text dropdown component.
 * The styles define the layout, colors, and hover states for dropdown elements.
 */

/**
 * CSS Module Export Function Type
 * Represents a webpack css-loader module that pushes CSS content to a collection
 * 
 * @param isProd - Whether the build is in production mode (false for development)
 * @returns An object with a push method to register CSS content
 */
declare module 'module_258503' {
  /**
   * CSS Loader Collection Interface
   * Maintains an array of CSS module entries
   */
  interface CSSLoaderCollection {
    /**
     * Registers a CSS module entry
     * 
     * @param entry - Tuple containing module ID and CSS content string
     */
    push(entry: [string | number, string]): void;
  }

  /**
   * CSS Loader Factory Function
   * Creates a CSS loader collection instance
   * 
   * @param isProduction - Flag indicating production build mode
   * @returns Collection object for managing CSS modules
   */
  function createCSSLoader(isProduction: boolean): CSSLoaderCollection;

  /**
   * Module Exports
   * The default export contains the CSS loader collection with registered styles
   */
  const exports: CSSLoaderCollection;
  
  export = exports;
}

/**
 * Pure Text Dropdown Component CSS Classes
 * Type definitions for the CSS classes used in the dropdown component
 */
declare namespace PureTextDropdownStyles {
  /**
   * Root wrapper class for the dropdown component
   * - Width: 146px
   * - Text alignment: center
   */
  const pureTextDropdownWrapper: string;

  /**
   * Dropdown content container
   * - Display: inline-block
   */
  const dropdownContent: string;

  /**
   * Main clickable part of the dropdown
   * - Background: white (#ffffff)
   * - Dimensions: 122px × 26px
   * - Border radius: 2px
   */
  const dropdownMainPart: string;

  /**
   * Label text within the main dropdown button
   * - Color: #19191e
   * - Font size: 16px
   * - Line height: 22px
   * - Font weight: 400
   */
  const dropdownMainLabel: string;

  /**
   * Triangle indicator icon
   * - Positioned absolutely
   * - Created using CSS borders
   * - Border bottom: 4px solid #19191e
   */
  const dropdownMainTriangle: string;

  /**
   * Dropdown menu list container
   * - Position: absolute, bottom: 40px
   * - Width: 122px
   * - Box shadow: 0px 4px 16px 0px rgba(25, 25, 50, 0.15)
   * - Border radius: 4px
   */
  const dropdownListPart: string;

  /**
   * Individual list item in the dropdown menu
   * - Height: 28px
   * - Padding left: 14px
   * - Font size: 12px
   * - Text alignment: left
   */
  const dropdownListLi: string;

  /**
   * Hover state for dropdown list items
   * - Background: #327dff (blue)
   * - Text color: white (#ffffff)
   * - Font weight: bold
   */
  const dropdownListHoverItem: string;
}

export as namespace PureTextDropdownCSS;
export = PureTextDropdownStyles;