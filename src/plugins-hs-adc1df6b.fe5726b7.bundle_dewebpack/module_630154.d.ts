/**
 * CSS Module Declaration
 * 
 * This module exports CSS styles for property bar label input components.
 * Includes styles for checkboxes, labels, inputs, and textareas.
 * 
 * @module PropertyBarLabelInputStyles
 */

/**
 * CSS module loader function type
 * @param useSourceMap - Whether to include source maps in the CSS output
 * @returns CSS loader instance with push method
 */
type CSSModuleLoader = (useSourceMap: boolean) => CSSLoader;

/**
 * CSS loader interface for managing style sheets
 */
interface CSSLoader {
  /**
   * Adds a CSS module to the loader
   * @param entry - Tuple containing module ID and CSS content
   */
  push(entry: [string, string]): void;
}

/**
 * Webpack module export function signature
 * @param exports - Module exports object
 * @param require - Webpack require function for loading dependencies
 */
declare function webpackModule(
  exports: { id: string; exports: CSSLoader },
  require: (moduleId: number) => CSSModuleLoader
): void;

/**
 * CSS class names available in this module
 */
export interface PropertyBarLabelInputStyles {
  /** Wrapper container for property bar label input components */
  'propertybar-labelinput-wrapper': string;
  
  /** Checkbox component within the property bar */
  'propertybar-labelinput-checkbox': string;
  
  /** Main label input container with flexbox layout */
  'propertybar-labelinput': string;
  
  /** Label text element with ellipsis overflow handling */
  'propertybar-labelinput-label': string;
  
  /** Textarea input with constrained max height */
  'propertybar-labelinput-textarea': string;
}

/**
 * CSS content for property bar label input components
 * 
 * Styles include:
 * - Checkbox layout with 37px height and left float
 * - Homestyler UI checkbox component spacing (0 8px 0 0)
 * - Flexbox label input container with space-between justification
 * - Label with text ellipsis for overflow (#888888 color)
 * - Textarea with 60px max-height and 12px font-size
 * - Ant Design textarea counter positioning adjustments
 */
declare const styles: PropertyBarLabelInputStyles;

export default styles;