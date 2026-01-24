/**
 * CSS Module: vdivider styles
 * 
 * This module exports CSS styles for a vertical divider component.
 * The styles are processed through a CSS loader (module 986380).
 * 
 * @module VDividerStyles
 */

/**
 * CSS content for the vdivider component
 * 
 * Styles applied:
 * - `.vdivider`: Applies a 1px left margin to create spacing for vertical divider
 */
declare const styles: string;

export default styles;

/**
 * Type definition for CSS loader function
 * 
 * @param sourceMap - Whether to include source maps in the output
 * @returns CSS loader instance with push method
 */
export interface CSSLoader {
  /**
   * Adds CSS content to the compilation
   * 
   * @param entry - Array containing module id, css content, and optional media query
   */
  push(entry: [string | number, string, string?]): void;
}