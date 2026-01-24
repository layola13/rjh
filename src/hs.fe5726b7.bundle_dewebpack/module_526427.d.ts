/**
 * CSS module export type definition
 * Module: module_526427
 * Original ID: 526427
 * 
 * Defines styles for an SVG icon container component with centered flexbox layout
 */

/**
 * CSS module exports interface
 * Contains class names for the SVG icon container and its nested elements
 */
export interface SvgIconContainerStyles {
  /** 
   * Main container class with flexbox centering
   * - 22x22px dimensions
   * - Centered content alignment
   * - Pointer cursor for interactivity
   */
  svgIconContainer: string;
  
  /** 
   * Wrapper element for SVG content
   * - Full width/height of parent container
   */
  svgWrapper: string;
}

/**
 * CSS Loader result interface
 * Standard structure returned by css-loader
 */
export interface CSSLoaderResult {
  /** Array of CSS content chunks [moduleId, cssContent, sourceMap?] */
  readonly content: ReadonlyArray<[string, string, string?]>;
  /** String representation of the module */
  toString(): string;
}

/**
 * Default export: CSS module content array
 * Format: [moduleId, cssString, sourceMap?]
 */
declare const styles: CSSLoaderResult;

export default styles;