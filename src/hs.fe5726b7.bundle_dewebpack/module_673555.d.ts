/**
 * CSS Module Type Definitions
 * This module exports CSS styles for a length input component with unit selection
 */

/**
 * CSS class names available in this module
 */
export interface LengthInputStyles {
  /** Main wrapper container for the length input component */
  'length-input-wrapper': string;
  
  /** Input element with centered text alignment */
  'length-input': string;
  
  /** Container for input, unit, and arrow controls */
  'input-wrapper': string;
  
  /** Top positioning variant for input wrapper */
  top: string;
  
  /** Right positioning variant for input wrapper (inline-block) */
  right: string;
  
  /** The actual input field element */
  input: string;
  
  /** Error state styling for input field */
  error: string;
  
  /** Dropdown select list for unit options */
  select: string;
  
  /** Individual option items in the select dropdown */
  options: string;
  
  /** Unit label display (e.g., "px", "em") */
  unit: string;
  
  /** Focused state for input field */
  'focus-input': string;
  
  /** Container for increment/decrement arrows */
  'arrow-group': string;
  
  /** Wrapper for upward arrow button */
  'arrow-up-wrapper': string;
  
  /** Upward arrow icon (CSS triangle) */
  'arrow-up': string;
  
  /** Wrapper for downward arrow button */
  'arrow-down-wrapper': string;
  
  /** Downward arrow icon (CSS triangle) */
  'arrow-down': string;
  
  /** Disabled state for input wrapper */
  disabled: string;
  
  /** Text label for the input */
  label: string;
  
  /** Left-aligned label variant */
  left: string;
  
  /** Bottom-aligned label variant */
  bottom: string;
}

/**
 * CSS Module Loader Function Signature
 * @param exports - Module exports object
 * @param require - Module require function
 * @param cssLoader - CSS loader utility function (module ID: 986380)
 */
declare function loadModule(
  exports: { id: string; exports: unknown },
  require: (id: string) => unknown,
  cssLoader: (sourceMap: boolean) => {
    push: (entry: [string, string]) => void;
  }
): void;

export default loadModule;

/**
 * CSS Content Structure
 * Represents the data structure pushed to the CSS loader
 */
export interface CSSModuleEntry {
  /** Module identifier */
  0: string;
  
  /** CSS content string */
  1: string;
}

/**
 * Component Features:
 * - Numeric input with unit selection (px, em, etc.)
 * - Increment/decrement arrow controls
 * - Dropdown unit selector on hover
 * - Focus states with blue (#327DFF) highlight
 * - Error state with red (#ff0000) border
 * - Disabled state with gray (#F0F0F5) background
 * - Label positioning options (left, bottom)
 * - Input dimensions: 53px × 24px
 * - Unit display: 20px × 24px
 * - Arrow controls: 20px × 24px
 */