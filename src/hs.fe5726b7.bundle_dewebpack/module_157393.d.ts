/**
 * CSS module type definition for toggle button component styles
 * Module ID: 157393
 * 
 * This module exports CSS styles for a toggle button UI component with various states
 * including active, inactive, and hover states.
 */

/**
 * CSS module export function type
 * Represents a webpack CSS loader module that pushes styles to the exports array
 * 
 * @param exports - The module exports object containing the style definitions
 * @param cssLoaderApi - CSS loader API factory function from webpack
 * @param moduleId - Unique identifier for this CSS module
 */
declare module 'module_157393' {
  /**
   * CSS class names available in this module
   */
  interface ToggleButtonStyles {
    /** Container class that adds extra margin to toggle button title */
    toggleButtonMargin: string;
    
    /** Title text styling for the toggle button */
    toggleButtonTitle: string;
    
    /** Base unordered list styling for toggle button container */
    ToggleBtn: string;
    
    /** Active state modifier for toggle button container (removes border) */
    ToggleButtonActive: string;
    
    /** Right border modifier for list items */
    ToggleButtonLiRight: string;
    
    /** Hover state styling for toggle button items */
    ToggleButtonHover: string;
    
    /** Hover state styling for left toggle button with border */
    ToggleButtonHoverLeft: string;
    
    /** Active state class for selected toggle button item */
    active: string;
    
    /** Non-active state class for unselected toggle button item */
    activeno: string;
    
    /** Inactive/disabled state class for toggle button item */
    inactive: string;
  }

  /**
   * CSS content string containing all toggle button styles
   * Includes styles for:
   * - Toggle button container and title
   * - List item states (active, inactive, hover)
   * - Border and spacing configurations
   * - Color schemes (#4d9bd6 for active, #fafafa for inactive backgrounds)
   */
  const styles: string;

  export default styles;
  export { ToggleButtonStyles };
}

/**
 * CSS Loader API type definition
 */
declare module 'css-loader-api' {
  /**
   * CSS loader factory function
   * @param sourceMap - Whether to include source maps (false in this case)
   * @returns CSS loader instance with push method
   */
  export default function cssLoaderApi(sourceMap: boolean): {
    /**
     * Push CSS content to the exports array
     * @param content - Tuple of [moduleId, cssString, sourceMap?]
     */
    push(content: [string | number, string, string?]): void;
  };
}