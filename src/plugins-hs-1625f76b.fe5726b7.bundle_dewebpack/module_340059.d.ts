/**
 * CSS Module Loader Type Definition
 * Module ID: 340059
 * 
 * This module exports CSS styles for an image button component with hover animations.
 * It uses a CSS-in-JS approach via webpack's css-loader.
 */

/**
 * Webpack module context containing module metadata and exports
 */
interface WebpackModuleContext {
  /** Unique module identifier */
  id: string | number;
  /** Module exports object */
  exports: CSSModuleExports;
}

/**
 * CSS Module exports interface from css-loader
 */
interface CSSModuleExports {
  /**
   * Pushes CSS content to the stylesheet collection
   * @param content - Tuple containing module ID and CSS string
   */
  push(content: [string | number, string]): void;
}

/**
 * CSS Loader factory function
 * @param sourceMap - Whether to include source maps in the output
 * @returns CSS module exports object with push method
 */
type CSSLoaderFactory = (sourceMap: boolean) => CSSModuleExports;

/**
 * Webpack require function for loading modules
 * @param moduleId - The ID of the module to require
 * @returns The loaded module (CSSLoaderFactory in this case)
 */
type WebpackRequire = (moduleId: number) => CSSLoaderFactory;

/**
 * Module definition function for a CSS module containing image button styles
 * 
 * Styles include:
 * - Hover animation with scale transform and box shadow
 * - Flexbox layout wrapper for image buttons
 * - Image button content styling (120x120px)
 * - Large view icon positioning
 * 
 * @param moduleContext - The webpack module context object
 * @param exports - The exports object to be populated
 * @param require - Webpack's require function for loading dependencies
 */
declare function module_340059(
  moduleContext: WebpackModuleContext,
  exports: CSSModuleExports,
  require: WebpackRequire
): void;

export default module_340059;

/**
 * CSS Class Names exported by this module (for type-safe usage)
 */
export interface CeilingImageButtonStyles {
  /** Main wrapper container for image buttons with flexbox layout */
  'ceiling-imagebutton-wrapper': string;
  
  /** Individual image button content container (120x120px) */
  'ceiling-imagebutton-content': string;
  
  /** Image element within the button */
  'ceiling-imagebutton-img': string;
  
  /** Hover state modifier class with animation */
  'ceiling-imagebutton-hover': string;
  
  /** Absolutely positioned large view icon (top-right corner) */
  'ceiling-largeview-icon': string;
}

/**
 * Keyframe animation name for hover effect
 */
export type HoverAnimationName = 'hoverAnimation';