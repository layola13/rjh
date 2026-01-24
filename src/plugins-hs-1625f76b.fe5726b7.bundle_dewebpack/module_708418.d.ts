/**
 * CSS module that defines styles for a custom view component.
 * This module exports CSS styles that position an element with the 'add-custom-view' class.
 * 
 * @module CustomViewStyles
 */

/**
 * Type definition for a CSS module loader function.
 * Represents a function that processes CSS content and returns a boolean indicating success.
 * 
 * @param sourceMap - Whether to generate source maps for the CSS
 * @returns A CSS loader instance with a push method
 */
type CSSModuleLoader = (sourceMap: boolean) => {
  /**
   * Pushes CSS content into the module system.
   * 
   * @param content - Array containing module ID and CSS string
   */
  push(content: [string, string, string]): void;
};

/**
 * CSS class styles for the add-custom-view component.
 * Positions the element at the bottom-right corner of its container.
 */
interface AddCustomViewStyles {
  /** CSS class name */
  readonly className: 'add-custom-view';
  /** Positioning styles */
  readonly styles: {
    /** Horizontal position from the right edge */
    right: '0px';
    /** Vertical position from the bottom edge (with important flag) */
    bottom: '10px !important';
  };
}

/**
 * Module exports containing the CSS styles for the custom view component.
 * The styles define positioning rules for elements with the 'add-custom-view' class.
 */
export declare const styles: AddCustomViewStyles;

/**
 * CSS content string exported by this module.
 * Defines styling rules for the .add-custom-view selector.
 */
export declare const cssContent: string;

export default styles;