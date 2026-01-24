/**
 * CSS Module Type Definition
 * Original Module ID: 560443
 * 
 * This module exports CSS styles for a dark-themed length input component with unit selection.
 */

/**
 * Webpack CSS loader function signature
 * @param sourceMap - Whether to include source maps in the CSS output
 * @returns CSS loader instance with push method for adding CSS rules
 */
declare function cssLoader(sourceMap: boolean): {
  /**
   * Adds a CSS module to the stylesheet
   * @param rule - Tuple containing module ID and CSS content
   */
  push(rule: [string, string]): void;
};

/**
 * CSS Module Export
 * Contains styles for a length input wrapper component with dark theme support.
 * 
 * Features:
 * - Input field with unit selector
 * - Up/down arrow controls for incrementing/decrementing values
 * - Color display option
 * - Focus and error states
 * - Disabled state styling
 * - Label positioning (left/bottom)
 */
declare module '560443' {
  /**
   * CSS class names exported by this module:
   * 
   * Main container:
   * - `.length-input-wrapper-dark` - Root container with inline-flex layout
   * 
   * Input elements:
   * - `.length-input` - Center-aligned text input
   * - `.input-wrapper` - Container for input and controls (64px width)
   * - `.input` - Text input field (42px × 24px)
   * - `.input.with-color` - Input variant with color picker
   * - `.input.error` - Error state styling
   * 
   * Unit selector:
   * - `.unit-dark` - Unit display/selector button (22px × 24px)
   * - `.unit-value` - Scaled unit text (0.8 transform)
   * - `.select` - Dropdown unit options list
   * - `.options` - Individual unit option items (22px height)
   * 
   * Arrow controls:
   * - `.arrow-group-dark` - Container for up/down arrows (22px × 24px)
   * - `.arrow-up-wrapper` - Upper arrow container (12px height)
   * - `.arrow-up` - Upward-pointing triangle (8px × 8px)
   * - `.arrow-down-wrapper` - Lower arrow container (11px height)
   * - `.arrow-down` - Downward-pointing triangle (8px × 8px)
   * 
   * Color display:
   * - `.display-color-container` - Color swatch container (24px height)
   * - `.display-color` - Color preview square (20px × 20px)
   * 
   * States:
   * - `.focus-input` - Applied when input is focused
   * - `.error` - Applied when validation fails
   * - `.disabled` - Applied when component is disabled (0.3 opacity)
   * 
   * Labels:
   * - `.label` - Text label (12px font, #96969b color)
   * - `.label.left` - Label positioned to the left (8px margin)
   * - `.label.bottom` - Label positioned below (10px margin-top)
   * 
   * Positioning:
   * - `.input-wrapper.top` - Top-aligned wrapper
   * - `.input-wrapper.right` - Right-aligned wrapper
   */
  const exports: {
    /**
     * The CSS module ID
     */
    id: string;
    
    /**
     * The compiled CSS content as a string
     */
    toString(): string;
  };
  
  export = exports;
}

/**
 * Module entry point
 * @param e - Module exports object
 * @param t - Module dependencies (unused)
 * @param n - Webpack require function
 */
declare const moduleDefinition: (
  e: { 
    id: string; 
    exports: unknown 
  }, 
  t: unknown, 
  n: (moduleId: number) => typeof cssLoader
) => void;

export default moduleDefinition;