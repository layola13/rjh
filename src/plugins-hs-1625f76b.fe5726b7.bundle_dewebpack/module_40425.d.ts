/**
 * CSS module definition for float toggle button component
 * Provides styling for an animated floating toggle button with expandable sub-buttons
 * @module FloatToggleButtonStyles
 */

/**
 * Webpack CSS loader module export function signature
 * @param exports - Module exports object to be populated
 * @param module - Current module information containing id and other metadata
 * @param require - Webpack require function for loading dependencies
 */
declare function cssModuleLoader(
  exports: Record<string, unknown>,
  module: { id: string | number; exports: unknown },
  require: (moduleId: number) => CSSLoaderFunction
): void;

/**
 * CSS loader function type returned by webpack's css-loader
 * @param sourceMap - Whether to include source maps in the output
 * @returns CSS loader instance with push method
 */
interface CSSLoaderFunction {
  (sourceMap: boolean): CSSLoader;
}

/**
 * CSS loader instance that collects CSS content
 */
interface CSSLoader {
  /**
   * Adds CSS content to the loader
   * @param entry - Tuple containing module id and CSS content string
   */
  push(entry: [string | number, string]): void;
}

/**
 * Float toggle button CSS styles
 * 
 * Features:
 * - Animated entrance from bottom (0px → 33px)
 * - Expandable button group on hover
 * - Smooth transitions for width, margin, opacity, and position
 * - Two button layout with hover effects
 * - Circular primary button (40px diameter)
 * - Box shadow effects
 * 
 * CSS Variables:
 * - --circle-size: 40px (primary button diameter)
 * - --single-button-width: 116px (individual sub-button width)
 * 
 * Key classes:
 * - .float-toggle-button-container: Root container with absolute positioning
 * - .float-toggle-button: Main button wrapper with hover expansion
 * - .float-button-container: Inner container managing button layout
 * - .float-circle-image-container: Circular icon container
 * - .float-group-buttons: Container for expandable sub-buttons
 * - .float-group-button: Individual sub-button (supports 0-1 index variants)
 * - .float-group-button-hover: Hover state styling (blue background)
 * - .one-btn-container: Variant for single button layout
 * 
 * Animation timeline:
 * - 0-1s: Entrance animation (bottom position)
 * - On hover: 200ms delay → 500ms expansion → 200ms content fade-in
 * - On hover end: 700ms transition back to collapsed state
 */
declare const floatToggleButtonStyles: string;

export = cssModuleLoader;