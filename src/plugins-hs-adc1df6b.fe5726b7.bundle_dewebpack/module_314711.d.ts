/**
 * CSS module export type definition
 * Module: module_314711
 * Original ID: 314711
 */

/**
 * CSS module loader function signature
 * @param sourceMap - Whether to include source maps in the CSS output
 * @returns Array containing module metadata and CSS content
 */
type CSSModuleLoader = (sourceMap: boolean) => {
  push: (entry: [string, string]) => void;
};

/**
 * Webpack module factory function for CSS modules
 * @param exports - The module exports object that will be populated
 * @param module - The current module object containing id and other metadata
 * @param require - The webpack require function to load dependencies
 */
declare function cssModuleFactory(
  exports: { id: string },
  module: unknown,
  require: (moduleId: number) => CSSModuleLoader
): void;

/**
 * CSS class names exported by this module
 */
export interface RightPropertyBarStyles {
  /** Container for open doors UI element */
  openDoors: string;
  
  /** Styled button for open action */
  openButton: string;
  
  /** Apply button with flex layout */
  applyBtn: string;
  
  /** Label text displayed to the right of an image/icon */
  imgRightLabel: string;
  
  /** Container wrapper for SVG icons */
  svgIconContainer: string;
  
  /** Wrapper element for SVG content */
  svgWrapper: string;
  
  /** Hover state class for interactive elements */
  hover: string;
  
  /** Normal/default state class for interactive elements */
  normal: string;
}

/**
 * CSS content for right property bar component
 * Includes styles for:
 * - openDoors: Top margin spacing
 * - openButton: Bordered inline button with fixed dimensions
 * - applyBtn: Flexbox-centered button with hover effects
 * - Icon and label styling with color transitions on hover
 */
declare const styles: RightPropertyBarStyles;

export default styles;