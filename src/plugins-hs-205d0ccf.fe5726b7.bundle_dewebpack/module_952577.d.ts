/**
 * CSS module loader type definition
 * Module: module_952577
 * Original ID: 952577
 * 
 * This module exports CSS styles for a slider input component with custom styling
 * for Ant Design slider elements.
 */

/**
 * CSS module export function signature
 * @param exports - The module exports object to be populated
 * @param cssLoader - CSS loader factory function imported from module 986380
 * @param moduleId - Unique identifier for this CSS module
 */
declare module 'module_952577' {
  /**
   * CSS class names available in this module
   */
  interface SliderInputStyles {
    /** Main container class for the slider input component */
    'slider-input': string;
    /** Outer wrapper class for the slider element */
    'slider-outer': string;
  }

  /**
   * CSS loader configuration interface
   */
  interface CSSLoaderOptions {
    /** Whether to use source maps */
    sourceMap?: boolean;
  }

  /**
   * CSS loader return type
   */
  interface CSSLoader {
    /**
     * Push CSS content to the loader
     * @param content - Array containing module ID and CSS string
     */
    push(content: [string, string]): void;
  }

  /**
   * CSS loader factory function type
   * @param sourceMap - Enable/disable source maps
   * @returns CSS loader instance
   */
  type CSSLoaderFactory = (sourceMap: boolean) => CSSLoader;

  /**
   * Module exports containing the CSS styles as a string
   * The CSS includes:
   * - .slider-input: Container with 208px width, inline-flex layout, 46px height
   * - .slider-outer: 128px width slider wrapper
   * - Custom Ant Design slider component styles (rail, step, dot, handle, track)
   * - Dark theme colors with blue (#396efe) accent
   */
  const styles: SliderInputStyles;
  export default styles;
}