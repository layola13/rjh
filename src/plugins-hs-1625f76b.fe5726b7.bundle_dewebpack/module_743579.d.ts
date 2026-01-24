/**
 * CSS Module Declaration
 * 
 * This module exports CSS styles for a loading icon component with animations.
 * Includes visibility states and rotation animation keyframes.
 * 
 * @module LoadingIconStyles
 */

/**
 * CSS loader function type
 * Represents a webpack css-loader that processes CSS content
 */
type CSSLoaderFunction = (useSourceMap: boolean) => CSSLoader;

/**
 * CSS Loader interface
 * Handles CSS module content and metadata
 */
interface CSSLoader {
  /**
   * Adds CSS content to the loader
   * @param content - Tuple containing [moduleId, cssContent, mediaQuery?, sourceMap?]
   */
  push(content: [string, string, string?, any?]): void;
}

/**
 * Webpack module exports function
 * @param exports - Module exports object
 * @param require - Webpack require function for loading dependencies
 * @param moduleRequire - Module-specific require function
 */
declare function loadingIconStylesModule(
  exports: { id: string; exports: CSSLoader },
  require: CSSLoaderFunction,
  moduleRequire: (moduleId: number) => CSSLoaderFunction
): void;

/**
 * CSS Module Content
 * 
 * Styles included:
 * - .loading-icon: Base loading icon styles (40x40px, transparent background)
 * - .loading-icon.show-loading-icon: Visible state (inline-flex display)
 * - .loading-icon.hide-loading-icon: Hidden state (display none)
 * - @keyframes rotateit: 360-degree rotation animation
 */
export const styles: string;

/**
 * Loading icon CSS class names
 */
export interface LoadingIconClasses {
  /** Base loading icon class - 40x40px transparent container */
  'loading-icon': string;
  
  /** Modifier class to show the loading icon with inline-flex display */
  'show-loading-icon': string;
  
  /** Modifier class to hide the loading icon */
  'hide-loading-icon': string;
}

/**
 * Rotation animation keyframe name
 * Animates from 0deg to 360deg rotation
 */
export const rotateAnimation: 'rotateit';

export default loadingIconStylesModule;