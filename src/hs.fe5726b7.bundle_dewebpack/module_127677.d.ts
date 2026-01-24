/**
 * CSS Module Definition
 * 
 * This module exports CSS styles for radio button components.
 * The styles are injected using a CSS loader mechanism.
 * 
 * @module RadioButtonStyles
 */

/**
 * Module exports function signature for CSS loader
 * 
 * @param exports - The module exports object to populate
 * @param require - The module require function for loading dependencies
 * @param module - The current module metadata object
 */
declare module "module_127677" {
  /**
   * CSS Module Loader Function
   * 
   * @param cssLoader - CSS loader utility function (from module 986380)
   * @returns CSS content array with module metadata
   */
  export default function (
    cssLoader: (sourceMap: boolean) => CSSLoaderAPI
  ): void;

  /**
   * CSS Loader API Interface
   */
  interface CSSLoaderAPI {
    /**
     * Pushes CSS content to the loader
     * 
     * @param content - Tuple containing module ID and CSS string
     */
    push(content: [moduleId: string, cssContent: string, sourceMap?: string]): void;
  }

  /**
   * CSS Class Definitions
   */
  export interface RadioButtonStyles {
    /**
     * Base radio button list item styles
     * - Auto width and height
     * - Pointer cursor for interactivity
     * - 5px horizontal padding
     * - Middle vertical alignment
     * - Float left layout
     */
    radioBtn: string;

    /**
     * Active state styles for radio button
     * - White text color
     * - Blue gradient background (#327DFF to #4B96FF)
     */
    "radioBtn.active": string;

    /**
     * SVG icon styles within radio button
     * - Fixed 22x22px dimensions
     */
    "radioBtn svg": string;
  }

  /**
   * CSS Content:
   * 
   * .radioBtn li {
   *   width: auto;
   *   height: auto;
   *   cursor: pointer;
   *   padding: 0 5px;
   *   vertical-align: middle;
   *   float: left;
   * }
   * 
   * .radioBtn li.active {
   *   color: white;
   *   background: #327DFF;
   *   background-image: linear-gradient(to right, #327DFF, #4B96FF) !important;
   * }
   * 
   * .radioBtn li svg {
   *   width: 22px;
   *   height: 22px;
   * }
   */
}